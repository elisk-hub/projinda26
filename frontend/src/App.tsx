import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import './App.css'

// Type definition for a task
interface Task {
  id: number
  title: string
  description: string
  deadline: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

function App() {
  // State that holds the list of tasks
  const [tasks, setTasks] = useState<Task[]>([])

  // Called when the user submits the form
  const handleAddTask = (newTask: {
    title: string
    description: string
    deadline: string
    priority: 'low' | 'medium' | 'high'
  }) => {
    const task: Task = {
      id: Date.now(), // Temporary ID until backend is connected
      ...newTask,
      completed: false,
    }
    setTasks([...tasks, task])
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <h2>My tasks</h2>
        {/* Task form for adding new tasks */}
        <TaskForm onSubmit={handleAddTask} />
        {/* Display list of tasks */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.priority}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App