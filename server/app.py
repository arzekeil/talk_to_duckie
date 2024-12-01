import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import voiceflow as vf
import uuid


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

user_id = str(uuid.uuid4())

load_dotenv()

CLOUDFLARE_ACCOUNT_ID = os.getenv('CLOUDFLARE_ACCOUNT_ID')
CLOUDFLARE_API_TOKEN = os.getenv('CLOUDFLARE_API_TOKEN')
CLOUDFLARE_WHISPER_URL = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper"


@app.route("/")
def health_check():
    return "Server is running"


@app.route("/stt", methods=["POST", "OPTIONS"])
def proxy_stt():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = jsonify({"message": "Preflight allowed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200

    if "audio_file" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio_file"]

    # Send the file to the Cloudflare Whisper API
    headers = {
        "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
        "Content-Type": "audio/mp3",
    }

    try:
        response = requests.post(
            CLOUDFLARE_WHISPER_URL,
            headers=headers,
            data=audio_file.read()
        )

        # Handle the response from Cloudflare API
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": "Failed to transcribe audio", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

@app.route("/parse_response", methods=["POST"])
def parse_user_response():
    data = request.get_json()
    message = data.get("userText", "")
    print("message", message)

    return { "response": vf.send_user_response(message) }


@app.route("/start", methods=["POST"])
def start():
    data = request.get_json()
    timer_value = data.get("timerValue", 120)

    response = vf.start_conversation(timer_value)
    return { "response": response }


@app.route("/timer_end", methods=["POST"])
def timer_end():
    response = vf.set_timer_end()
    return { "response": response }


@app.route("/submit_code", methods=["POST"])
def submit_code():
    data = request.get_json()
    code = data.get("code", '')

    response = vf.trigger_submit_code(code)
    return { "response": response }


if __name__ == '__main__':
    app.run(debug=True, port=5000)
