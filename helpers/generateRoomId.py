import random 
import string

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def generateRoomId(roomIdList):
    retRoomId = ''.join(random.choice(ALPHABET) for _ in range(5))

    if(len(roomIdList)!=0):
        while(retRoomId in roomIdList):
            retRoomId = ''.join(random.choice(ALPHABET) for _ in range(5))
    
    return retRoomId
