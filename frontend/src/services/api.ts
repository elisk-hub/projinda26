// Base URL for the backend API
const API_URL = "http://localhost:8000"

// Type definition for a Task - matches Eliza's database schema
// Note: priority is stored as number in backend (1=high, 2=medium, 3=low)
export interface Task {
  id: number
  title: string
  description: string | null
  deadline: string | null
  priority: number
  completed: boolean // 0 or 1 in SQLite
}

// Fetch all tasks from backend
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`)
  return response.json()
}

// Create a new task
export const createTask = async (task: {
  title: string
  description?: string
  deadline?: string
  priority?: number
}): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  return response.json()
}

// Update a task (also used for marking as complete)
export const updateTask = async (id: number, updates: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
  return response.json()
}

// Delete a task by id
export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  })
}

// Fetch tasks due today or overdue
export const getTodayTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks/today`)
  return response.json()
}

export const getWeekTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks/week`)
  return response.json()
}

export const getAIPlan = async (): Promise<{ plan: string }> => {
  const response = await fetch(`${API_URL}/ai/plan`)
  return response.json()
}

export const getAIPlanWithCalendar = async (): Promise<{ plan: string }> => {
  const response = await fetch(`${API_URL}/ai/plan/calendar`)
  return response.json()
}