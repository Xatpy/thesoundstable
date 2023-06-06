import os
import json

def sanitize_filename(filename):
    # Capitalize the first letter and replace underscores with spaces
    sanitized_name = filename.replace('_', ' ').capitalize()
    return sanitized_name

def generate_json(folder_path):
    data = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".mp3"):
            # Remove the file extension
            text = os.path.splitext(filename)[0]
            # Sanitize the file name
            sanitized_text = sanitize_filename(text)
            # Create the sound URL
            sound_url = f"https://raw.githubusercontent.com/Xatpy/thesoundstable/main/sounds/APM/data/{filename}"
            # Create an object for each file
            file_data = {
                "text": sanitized_text,
                "soundURL": sound_url
            }
            data.append(file_data)

    # Create the final JSON object
    json_data = {
        "title": "foo",
        "sounds": data
    }

    # Write the JSON data to a file
    with open("out.json", "w") as outfile:
        json.dump(json_data, outfile, indent=4)

# Provide the folder path where your files are located
folder_path = "/Users/jaimechapinal/workspace/thesoundstable/sounds/APM/data"

# Call the function to generate the JSON file
generate_json(folder_path)