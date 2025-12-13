import random

class GameRoom:
    def __init__(self,room_id,owner_name):
        self.room_id = room_id
        self.player_count = 1
        self.player_name = [owner_name]
        self.player_roles = [False]
        self.scores = [0]
        self.game_started = False
        self.current_secret = 0
        self.prev_secrets = []
        self.chats = []

    def addPlayer(self,playerName):
        self.player_count += 1
        self.player_name.append(playerName)
        self.player_roles.append(False)
        self.scores.append(0)

    def startGame(self,wordList,changeImposter=False):

        #Create list of previously used secret words
        if (not self.current_secret == 0):
            self.prev_secrets.append(self.current_secret)
        
        new_secret = random.randint(1,len(wordList))

        while (str(new_secret) in self.prev_secrets):
            new_secret = random.randint(1,len(wordList))
        
        self.current_secret = new_secret
        
        #Set new imposter
        new_imposter = random.randint(0,self.player_count - 1)
        prev_impostor = self.player_roles.index(True) if True in self.player_roles else None

        if(changeImposter and not self.current_secret==0):
            while(new_imposter == prev_impostor):
                new_imposter = random.randint(0,self.player_count - 1)
        
        if(prev_impostor != None):
            self.player_roles[prev_impostor] = False
        self.player_roles[new_imposter] = True

    def vote_result(self,voteData):
        impostor = self.player_roles.index(True)

        vote_counts = {}
        for voter, target in voteData.items():
            vote_counts[target] = vote_counts.get(target, 0) + 1

        voted_out = max(vote_counts, key=vote_counts.get)

        for i in range(self.player_count):
            self.scores[i] += 1

        if voted_out == impostor:
            for pid, target in voteData.items():
                if target == impostor:
                    self.scores[pid] += 1  
                    
            return "impostor_eliminated"
        
        elif (voted_out == -1):

            return 'failed_vote'

        else:
            self.scores[impostor] += 2  

            for pid, target in voteData.items():
                if target == impostor:
                    self.scores[pid] += 1  

            self.scores[voted_out] -= 1

            return "innocent_eliminated"
    
    def is_imposter(self,playerId):

        return self.player_roles[playerId]
    
    def guess_word(self,word,wordList):

        if self.current_secret is None:
            return False
        return word.lower() == wordList[str(self.current_secret)]

    def increment_impostor_score(self):

        self.scores[self.player_roles.index(True)] += 2

