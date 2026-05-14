/*
  WeekView.tsx - Shows all tasks due this week
  Fetches from GET /tasks/week and displays them in a styled list
*/

import { useState, useEffect } from 'react'
import { getWeekTasks } from '../services/api'
import type { Task } from '../services/api'

const PRIORITY_LABEL: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' }
const PRIORITY_CLASS: Record<number, string> = { 1: 'high', 2: 'medium', 3: 'low' }

function WeekView() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getWeekTasks().then(setTasks)
  }, [])

  if (tasks.length === 0) {
    return (
      <div className="card week-section">
        <p className="section-label">This week</p>
        <p className="no-tasks">No tasks this week 🎉</p>
      </div>
    )
  }

  return (
    <div className="card week-section">
      <p className="section-label">This week</p>
      <ul className="week-list">
        {tasks.map(task => (
          <li key={task.id} className="week-item">
            <div className="task-title">
              {task.title}
              <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                {PRIORITY_LABEL[task.priority]}
              </span>
            </div>
            {task.deadline && (
              <div className="task-meta">Due: {task.deadline}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeekView