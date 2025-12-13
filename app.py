from flask import Flask, request, jsonify, session
from datetime import timedelta
from dotenv import load_dotenv
from flask_socketio import SocketIO, join_room, leave_room, emit
from game.GameRoom import GameRoom
from helpers.generateRoomId import generateRoomId
from database.user_model import  verify_user, create_user
import json
import os

load_dotenv()

app = Flask(__name__, static_folder='static')
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.permanent_session_lifetime = timedelta(minutes=15)
socketio = SocketIO(app,cors_allowed_origins="*",manage_session=False)

with open("game/secretWordList",'r') as f:
    wordList = json.load(f)

rooms = {}
room_members = {}

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.post("/register")
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    success, error = create_user(username, password)

    if not success:
        return jsonify({"success": False, "error": error}), 400

    return jsonify({"success": True})

@app.post("/login")
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    success, user_id_or_error = verify_user(username, password)

    if not success:
        return jsonify({"success": False, "error": user_id_or_error}), 400

    user_id = user_id_or_error

    session.permanent = True
    session["username"] = username
    session["user_id"] = user_id

    return jsonify({
        "success": True,
        "user_id": user_id
    })

@app.get("/me")
def me():
    if "username" in session:
        return {"logged_in": True, "username": session["username"]}
    else:
        return {"logged_in": False}

@app.post("/logout")
def logout():
    session.clear()
    return jsonify({"success": True})

@app.post("/create_room")
def create_room():
    if "username" not in session:
        return jsonify({"success": False, "error": "Unauthorized"}), 401

    owner_name = session["username"]     
    room_id = generateRoomId(rooms.keys())

    rooms[room_id] = GameRoom(room_id, owner_name)
    room_members[room_id] = {}

    return jsonify({"success": True, "room_id": room_id})

@app.post("/join_room")
def http_join_room():
    if "username" not in session:
        return jsonify({"success": False, "error": "Unauthorized"}), 401

    data = request.json
    room_id = data["room_id"]
    player_name = session["username"]  

    if room_id not in rooms:
        return jsonify({"success": False, "error": "404"}), 404
    
    room = rooms[room_id]
    room.addPlayer(player_name)
    player_index = room.player_count - 1
    
    
    return jsonify({"success": True, "player_index": player_index})

@app.get("/room_info/<room_id>")
def room_info(room_id):

    if room_id not in rooms:
        return jsonify({"success": False, "error": "Room does not exist"}), 404

    room = rooms[room_id]
    return jsonify({
        "success": True,
        "room_id": room_id,
        "player_count": room.player_count,
        "players": room.player_name
    })

@socketio.on("join_socket_room")
def join_socket(data):
    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return

    room_id = data["room_id"]
    player_index = data["player_index"]

    join_room(room_id)

    room_members[room_id][request.sid] = player_index

    room = rooms[room_id]
    emit(
        "player_list", 
        {
            "players": room.player_name
        }
        , to=room_id
        )

@socketio.on('start_game')
def start_game(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return
    
    
    room_id = data['room_id']
    room = rooms[room_id]

    if (room.player_count < 3):
        emit("game_error",{"message": "Not enough players."})
        return

    room.startGame(wordList, changeImposter=False)

    impostor = room.player_roles.index(True)

    for sid, pid in room_members[room_id].items():
        if pid == impostor:
            emit(
                "secret_word", 
                {
                    "secret": 'impostor'
                    }
                    , to=sid
                )
        else:
            emit("secret_word", 
                 {
                     "secret": wordList[str(room.current_secret)]
                 }
                 , to=sid
                )

    emit("Round Started",{},to=room_id)

@socketio.on('submit_vote')
def submit_vote(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return

    room_id = data['room_id']
    target_index = data['target']

    room = rooms[room_id]
    player_id = room_members[room_id][request.sid]
    impostor_index = room.player_roles.index(True)
    required_votes = room.player_count - 1

    room.consent = {}
    
    room.votes[player_id] = target_index

    non_impostor_votes = {
        pid: vote for pid, vote in room.votes.items() if pid != impostor_index
    }

    if len(non_impostor_votes) == required_votes:
        result = room.vote_result(room.votes)
        scores = room.scores
    
        emit(
            "vote_result",
            {
                "result": result,
                "scores":scores
            },
                to=room_id
            )

@socketio.on("guess_word")
def guess_word_event(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return
    
    room_id = data['room_id']
    guess = data['guess']

    room = rooms[room_id]
    correct = room.guess_word(guess, wordList)

    if correct:
        room.increment_impostor_score()

    emit("guess_result", {
        "correct": correct,
        "scores": room.scores
    }, to=room_id)

@socketio.on("send_message")
def send_message(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return
    
    room_id = data["room_id"]
    message = data["message"]

    player_index = room_members[room_id][request.sid]
    room = rooms[room_id]
    player_name = room.player_name[player_index]

    room.chats.append({
        "player": player_name,
        "message": message
    })

    emit("new_message", {
        "player": player_name,
        "message": message
    }, to=room_id)

@socketio.on('initiate_voting')
def initiate_voting(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return

    room_id = data['room_id']
    player_id = data['player_id']

    room = rooms[room_id]
    impostor = room.player_roles.index(True)


    if not hasattr(room, "votes"):
        room.votes = {}
    else:
        room.votes = {}

    if (not hasattr(room,'consent')):
        room.consent = {}
        room.consent[impostor] = True

    room.consent[player_id] = True

    for sid, pid in room_members[room_id].items():
        if pid == impostor:
            continue

        emit(
            "initiate_consent",
            {
                "title": "Consent for Voting Impostor",
                "message": "Someone initiated voting for impostor, do you want to consent?"
            },
            to=sid
        )

@socketio.on('respond_vote_request')
def respond_vote_request(data):

    if "username" not in session:
        emit("error", {"message": "Unauthorized"})
        return
    
    room_id = data['room_id']
    player_id = data['player_id']
    response = data['consent']

    room = rooms[room_id]
    impostor_index = room.player_roles.index(True)
    required_responses = room.player_count - 1

    room.consent[player_id] = response

    non_impostor_responses = {
        pid: consent for pid, consent in room.consent.items() if pid != impostor_index
    }

    if len(non_impostor_responses) == required_responses:
        approvals = sum(1 for consent in non_impostor_responses.values() if consent)
        room.consent = {}

        if approvals > required_responses / 2:
            for sid, pid in room_members[room_id].items():
                if pid == impostor_index:
                    continue
                
                emit(
                    "initiate_voting",
                    {
                        "title": "Voting",
                        "message": "Please select who you think is the impostor",
                        "players": room.player_name
                    },
                    to=sid
                )
        else:
            emit("vote_initiation_failed",{},to=room_id)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=2025)
    
