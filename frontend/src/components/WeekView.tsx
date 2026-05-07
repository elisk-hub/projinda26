import { useState, useEffect } from 'react'
import { getWeekTasks } from '../services/api'
import type { Task } from '../services/api'

const PRIORITY: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' }

function WeekView() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getWeekTasks().then(setTasks)
  }, [])

  if (tasks.length === 0) return <p>No tasks this week 🎉</p>

  return (
    <section className="week-section">
      <h3>📅 This week</h3>
      <ul className="week-list">
        {tasks.map(task => (
          <li key={task.id} className="week-item">
            <span>{task.title}</span>
            <span>Priority: {PRIORITY[task.priority]}</span>
            <span>Due: {task.deadline}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WeekView