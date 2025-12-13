import re
import json

reString = r'([A-Za-z]+)'

outputWords = {}
i=1

with open('game/secretWordList','r') as f:
    for line in f.readlines():
        matches = re.search(reString,line)
        if(matches):
            if(matches.group(1) != "Level"):
                outputWords[i] = matches.group(1).lower()
                i += 1

with open('game/secretWordList','w') as f:

    json.dump(outputWords,f, indent=4)