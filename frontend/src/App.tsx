/*
  App.tsx - The main component of TaskFlow

  It does five things:
  1. Fetches all tasks from the backend when the app loads
  2. Shows an overview card with total / done / remaining counts
  3. Handles adding a new task when the user submits the form
  4. Handles marking a task as complete/incomplete
  5. Handles deleting a task
*/

import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TodaySection from './components/TodaySection'
import WeekView from './components/WeekView'
import { getTasks, createTask, deleteTask, updateTask } from './services/api'
import AIPlan from './components/AIPlan'
import type { Task } from './services/api'
import './App.css'

const PRIORITY_LABEL: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' }
const PRIORITY_CLASS: Record<number, string> = { 1: 'high', 2: 'medium', 3: 'low' }

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  const handleAddTask = async (newTask: {
    title: string
    description: string
    deadline: string
    priority: 'low' | 'medium' | 'high'
  }) => {
    const priorityMap = { high: 1, medium: 2, low: 3 }
    const created = await createTask({
      ...newTask,
      priority: priorityMap[newTask.priority],
    })
    setTasks([...tasks, created])
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed })
    setTasks(tasks.map(t => t.id === task.id ? updated : t))
  }

  const total = tasks.length
  const done = tasks.filter(t => t.completed).length
  const remaining = total - done
  const progressPercent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="app">
      <Header />
      <main className="container">

        {/* Overview card */}
        <div className="card">
          <p className="section-label">Overview</p>
          <div className="overview-grid">
            <div className="stat-box total">
              <span className="stat-number">{total}</span>
              <span className="stat-label">Total tasks</span>
            </div>
            <div className="stat-box done">
              <span className="stat-number">{done}</span>
              <span className="stat-label">Done</span>
            </div>
            <div className="stat-box left">
              <span className="stat-number">{remaining}</span>
              <span className="stat-label">Remaining</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Today's tasks */}
        <TodaySection />

        {/* This week */}
        <WeekView />
        
        {/* AI Plan */}
        <AIPlan tasks={tasks} />
  
        {/* All tasks */}
        <div className="card">
          <p className="section-label">My tasks</p>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="task-title">
                    {task.title}
                    <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                      {PRIORITY_LABEL[task.priority]}
                    </span>
                  </div>
                  {task.description && (
                    <div className="task-meta">{task.description}</div>
                  )}
                  {task.deadline && (
                    <div className="task-meta">Due: {task.deadline}</div>
                  )}
                </div>
                <div className="task-actions">
                  <button className="complete-btn" onClick={() => handleComplete(task)}>
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add new task form */}
        <TaskForm onSubmit={handleAddTask} />

      </main>
    </div>
  )
}

export default App