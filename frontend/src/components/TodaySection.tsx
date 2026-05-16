import { useState, useEffect } from 'react'
import { getTodayTasks } from '../services/api'
import type { Task } from '../services/api'

const PRIORITY_LABEL: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' }
const PRIORITY_CLASS: Record<number, string> = { 1: 'high', 2: 'medium', 3: 'low' }

function TodaySection() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTodayTasks().then(setTasks)
  }, [])

  if (tasks.length === 0) return null

  return (
    <div className="card today-section">
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
        ⚡ This is what you should do today
      </h3>
      <ul className="today-list">
        {tasks.map(task => (
          <li key={task.id} className="today-item">
            <div>
              <div className="task-title">
                {task.title}
                <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                  {PRIORITY_LABEL[task.priority]}
                </span>
              </div>
              {task.deadline && (
                <div className="task-meta">Due: {task.deadline}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodaySection