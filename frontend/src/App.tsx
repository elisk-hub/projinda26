import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import { getTasks, createTask, deleteTask, updateTask } from './services/api'
import type { Task } from './services/api'
import './App.css'

function App() {
  // State that holds the list of tasks from backend
  const [tasks, setTasks] = useState<Task[]>([])

  // Fetch all tasks when the app loads
  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  // Called when the user submits the form
  const handleAddTask = async (newTask: {
    title: string
    description: string
    deadline: string
    priority: 'low' | 'medium' | 'high'
  }) => {
    // Convert priority from string to number for backend
    const priorityMap = { high: 1, medium: 2, low: 3 }
    const created = await createTask({
      ...newTask,
      priority: priorityMap[newTask.priority],
    })
    setTasks([...tasks, created])
  }

  // Delete a task
  const handleDelete = async (id: number) => {
    await deleteTask(id)
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Mark a task as complete/incomplete
  const handleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed })
    setTasks(tasks.map(t => t.id === task.id ? updated : t))
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <h2>My tasks</h2>
        {/* Task form for adding new tasks */}
        <TaskForm onSubmit={handleAddTask} />
        {/* Display list of tasks */}
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span>{task.title} - Priority: {task.priority}</span>
              <div>
                <button onClick={() => handleComplete(task)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App