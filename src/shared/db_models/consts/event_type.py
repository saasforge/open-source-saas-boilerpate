from enum import Enum

class EventType(Enum):
    user_registered = 'user_registered'


def get_text_event(event: EventType):
    dic = {
        EventType.user_registered: 'User registered'
    }
    return dic[event]