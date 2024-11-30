import requests
import os
from dotenv import load_dotenv
import uuid

load_dotenv()
API_KEY = os.getenv('VOICEFLOW_API_KEY')

user_id = str(uuid.uuid4())
BASE_URL = f"https://general-runtime.voiceflow.com/state/user/{user_id}"


def interact(user_id, request):
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
            # replies.append(False)
    return replies
    

def set_timer_end(user_id):
    response = interact(user_id, { 'type': 'text', 'payload': 'timer end' })
    return response


def trigger_submit_code(user_id, code):
    return interact(user_id, { 'type': 'text', 'payload': code })

