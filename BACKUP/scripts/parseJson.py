from os import walk
import os

import json

path = "/Users/jaimechapinal/workspace/thesoundstable/ElChiringuito/data"

character = "ElChiringuito"

f = []
filenames = next(walk(path), (None, None, []))[2]  

class Sound():
    def __init__(self, text, soundURL):
        self.text = text
        self.soundURL = soundURL

class File():
    def __init__(self, title, sounds):
        self.title = title
        self.sounds = sounds

listSounds = []
for filename in filenames:
    name = os.path.splitext(filename)[0]
    name = name.replace("-", " ").capitalize()
    url = f"https://raw.githubusercontent.com/Xatpy/thesoundstable/master/{character}/data/{filename}"
    newSound = {
        "text": name, 
        "soundURL": url
    }
    
    listSounds.append(newSound)
    print(filename)

newFile = {
    "title": character,
    "sounds": listSounds
}

json_string = json.dumps(newFile, indent='\t', separators=(',', ': '))
print(json_string)

with open('data.json', 'w') as outfile:
    outfile.write(json_string)

print(filenames)