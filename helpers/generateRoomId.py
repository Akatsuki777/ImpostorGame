import random 
import string

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def generateRoomId(roomIdList):
    retRoomId = genNewId()

    if(len(roomIdList)!=0):
        while(retRoomId in roomIdList):
            retRoomId = genNewId()
    
    return retRoomId

def genNewId():

    return ''.join(random.choice(ALPHABET) for _ in range(5))
