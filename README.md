# projinda26

# TaskFlow
**Smart To-Do App**

## Authors
Sandra & Eliza

## Description
TaskFlow is a smart to-do web application designed to help users organize and prioritize their tasks.

Users can create tasks by entering a title, description, deadline, and priority. All tasks are displayed in a list where they can be marked as completed.

In addition to basic functionality, the application includes smart features that support planning and productivity. Tasks are automatically sorted based on deadline and priority, and the system suggests which tasks should be completed first.

The application also includes a section called "This is what you should do today", where the most important tasks are highlighted. A simple weekly view provides an overview of upcoming tasks.

An AI-based feature is used to generate a simple daily or weekly plan based on the user’s tasks.

## Features
- Create, edit, and delete tasks
- Set deadlines and priorities
- Mark tasks as completed
- View all tasks in a list
- Automatic sorting based on deadline and priority
- "This is what you should do today" section
- Weekly task overview
- AI-generated planning suggestions based on your tasks
- Google Calendar integration

## Tech Stack
- **Frontend:** React with TypeScript
- **Backend:** Python (FastAPI)
- **Database:** SQLite
- **AI:** Gemini API

## Installation

### Backend
```bash
cd backend
pip3 install -r requirements.txt
pip3 install google-generativeai python-dotenv google-auth google-auth-oauthlib google-api-python-client
```

Create a `.env` file in the `backend/` folder:
GEMINI_API_KEY=your_api_key_here

For Google Calendar integration, add your `credentials.json` to `backend/` and run:
```bash
python3 auth.py
```

Start the server:
```bash
python3 -m uvicorn main:app --reload
```
Runs at `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`