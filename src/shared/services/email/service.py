from threading import Thread
from flask import current_app, render_template
from flask_mail import Message
from src.shared.utils.extensions import mail

def __send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(to, subject, text_body, html_body, sender_name, sender_email):
    app = current_app._get_current_object()
    recipients = [to] if isinstance(to, str) else to
    sender = (sender_name, sender_email)
    msg = Message(subject, sender = sender, recipients = recipients) 
    msg.body = text_body
    msg.html = html_body
    thr = Thread(target = __send_async_email, args=[app, msg])
    thr.start()
    return thr