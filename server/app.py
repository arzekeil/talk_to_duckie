from flask import Flask, request, jsonify
from flask_cors import CORS
# from interact import interact

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'


@app.route("/parse_recording", methods=["POST"])
def parse_recording():
    user_id = "testing"
    data = request.get_json()
    message = data.get("message")
    print("message", message)
    response = interact(user_id, { 'type': 'text', 'payload': message })
    return { "response": response }

@app.route('/ai-response', methods=['POST'])
def ai_response():
    # Parse the JSON data from the request body
    data = request.get_json()
    
    # Extract the 'userText' field
    user_text = data.get('userText', '')
    
    # Print the userText to the console
    print(f"Received userText: {user_text}")
    
    # Send a response back
    return jsonify({"response": "userText received", "userText": user_text}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
