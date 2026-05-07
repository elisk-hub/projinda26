/*
  TodaySection.tsx - Shows tasks that are due today or overdue
  Fetches from GET /tasks/today and displays them as a highlighted list
*/

import { useState, useEffect } from 'react'
import { getTodayTasks } from '../services/api'
import type { Task } from '../services/api'

const PRIORITY: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' }

function TodaySection() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTodayTasks().then(setTasks)
  }, [])

  if (tasks.length === 0) return null  // Hide section if no tasks

  return (
    <section className="today-section">
      <h3>⚡ This is what you should do today</h3>
      <ul className="today-list">
        {tasks.map(task => (
          <li key={task.id} className="today-item">
            <span>{task.title}</span>
            <span>Priority: {PRIORITY[task.priority]}</span>
            <span>Due: {task.deadline}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodaySection