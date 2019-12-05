call venv\Scripts\activate.bat
call python -m pip install --upgrade pip
call pip install -r requirements.txt
call npm install
REM use flask dbupdate for dropping existing database and rolling all new tabels
call flask dbcreate
call npm run dev
call flask run