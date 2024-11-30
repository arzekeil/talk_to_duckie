import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('VOICEFLOW_API_KEY')


def interact(user_id, request):
    response = requests.post(
        f'https://general-runtime.voiceflow.com/state/user/{user_id}/interact',
        json={ 'request': request },
        headers={ 
            'Authorization': api_key,
            'versionID': 'production'
        },
    )

    replies = []
    for trace in response.json():
        if trace['type'] == 'text':
            replies.append(trace['payload']['message'])
        elif trace["type"] == "end":
            print("# End of conversation")
            replies.append(False)
    return replies
    
user_id = "testing"
interact(user_id, { 'type': 'launch' })
