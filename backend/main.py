from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import TaskCreate, TaskUpdate
import database
from dotenv import load_dotenv
import google.generativeai as genai
import os

app = FastAPI() # creates app
load_dotenv()  # Läser in .env-filen
 
# Allows my React-app talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
@app.get("/")
def root():
    return {"status": "Backend runs!"}

# GET /tasks
# Returns a list of all tasks from the database
@app.get("/tasks")
def get_tasks():
    return database.get_all_tasks()

# POST /tasks
# Creates a new task. Frontend sends title, description, deadline, priority.
@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate):
    return database.create_task(task.model_dump())
 
 
# PUT /tasks/{id}
# Updates an existing task. Also used for marking a task as complete.
@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    updated = database.update_task(task_id, task.model_dump(exclude_none=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated
 
 
# DELETE /tasks/{id}
# Deletes a task permanently.
@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    if not database.delete_task(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    

# GET /tasks/today
# Returns tasks that are due today or overdue.
@app.get("/tasks/today")
def get_today_tasks():
    return database.get_today_tasks()

# GET /tasks/week
# Returns tasks due within the next 7 days.
@app.get("/tasks/week")
def get_week_tasks():
    return database.get_week_tasks()


# GET /ai/plan
# Returns plan made by AI.
@app.get("/ai/plan")
def get_ai_plan():
    # 1. Brings all tasks from database
    tasks = database.get_all_tasks()
    incomplete = [t for t in tasks if not t['completed']]

    if not incomplete:
        return {"plan": "No tasks found. Add some tasks to get a plan!"}

    # 2. Formates text for Gemini
    task_list = "\n".join([
        f"- {t['title']} (Priority: {t['priority']}, Deadline: {t['deadline'] or 'No deadline'})"
        for t in incomplete
    ])

    # 3. Sends to Gemini
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(f"""
        You are a helpful productivity assistant.
        Based on these tasks, create a short and practical day plan.
        Prioritize tasks with near deadlines and high priority (1=High, 2=Medium, 3=Low).
        Be concise and friendly.

        Tasks:
        {task_list}
    """)

    # 4. Return the plan
    return {"plan": response.text}