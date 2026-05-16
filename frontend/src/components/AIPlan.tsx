import { useState, useEffect } from 'react'
import { getAIPlan } from '../services/api'
import type { Task } from '../services/api'

interface AIPlanProps {
  tasks: Task[]
}

function AIPlan({ tasks }: AIPlanProps) {
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getAIPlan()
      .then(result => setPlan(result.plan))
      .finally(() => setLoading(false))
  }, [tasks])

  const formatPlan = (text: string) => {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return null

    // Handle bullet points starting with *
    if (trimmed.startsWith('*')) {
      const content = trimmed.replace(/^\*\s*/, '')
      const parts = content.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={i} style={{ marginBottom: '4px', paddingLeft: '16px' }}>
          • {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      )
    }

    // Regular lines
    const parts = trimmed.split(/\*\*(.*?)\*\*/g)
    return (
      <p key={i} style={{ marginBottom: '8px', fontWeight: i === 0 ? '600' : '400' }}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </p>
    )
  })
}

  return (
    <div className="card ai-section">
      <div className="today-chip">✦ AI Plan</div>
      <p className="section-label">Your daily plan</p>
      {loading && <p className="no-tasks">Generating your plan...</p>}
      {plan && <div className="ai-plan">{formatPlan(plan)}</div>}
    </div>
  )
}

export default AIPlan