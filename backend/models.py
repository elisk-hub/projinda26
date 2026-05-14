from pydantic import BaseModel
from typing import Optional
 
 
# This is the Task model — it defines what a task looks like in our app.
# Pydantic automatically validates that the data has the right types.
class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None   # Optional means it can be left empty
    deadline: Optional[str] = None      # Format: "YYYY-MM-DD"
    priority: int = 2                   # 1 = High, 2 = Medium, 3 = Low
    completed: bool = False
 
 
# TaskCreate is used when the user creates a new task.
# No id here — the database assigns that automatically.
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[str] = None
    priority: int = 2

# TaskUpdate is used when editing an existing task.
# All fields are optional — you only send what you want to change.
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None
    priority: Optional[int] = None
    completed: Optional[bool] = None
 