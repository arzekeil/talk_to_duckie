from flask import Flask, request
from flask_cors import CORS
import voiceflow as vf
import uuid

app = Flask(__name__)
CORS(app)


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
