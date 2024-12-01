import requests
import os
from dotenv import load_dotenv
import uuid

load_dotenv()
API_KEY = os.getenv('VOICEFLOW_API_KEY')

user_id = str(uuid.uuid4())  # new user id for each session
BASE_URL = f"https://general-runtime.voiceflow.com/state/user/{user_id}"


def __interact(request):
    response = requests.post(
        f'{BASE_URL}/interact',
        json={ 'request': request },
        headers={ 
            'Authorization': API_KEY,
            'versionID': 'production'
        },
    )

    replies = []
    for trace in response.json():
        if trace['type'] == 'text':
            replies.append(trace['payload']['message'])
        elif trace["type"] == "end":
            print("# End of conversation")
    return replies
    

def start_conversation(timer_value):
    # convert the timer value from seconds to minutes
    timer_value = round(int(timer_value) / 60, 1)
    __set_variable_value("timer_value", timer_value)

    return __interact({ 'type': 'launch' })


def send_user_response(user_text):
    return __interact({ 'type': 'text', 'payload': user_text })


def __set_variable_value(variable_name, variable_value):
    url = f"{BASE_URL}/variables"

    payload = { variable_name: variable_value }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        'Authorization': API_KEY,
        'versionID': 'production'
    }

    requests.patch(url, json=payload, headers=headers)


def set_timer_end():
    __set_variable_value("timer_finished", "true")
    trigger_response = __interact({ 'type': 'text', 'payload': 'timer end' })
    return trigger_response


def trigger_submit_code(code):
    return __interact({ 'type': 'text', 'payload': code })
