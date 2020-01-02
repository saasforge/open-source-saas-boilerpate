python -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
npm install
flask dbcreate
npm run dev
flask run