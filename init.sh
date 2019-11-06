#!/bin/bash

source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
npm install
flask dbupdate
npm run dev
flask run