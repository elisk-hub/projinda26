/*
  Calendar.tsx - Shows AI-generated plan based on tasks and Google Calendar events
  Fetches from GET /ai/plan/calendar
*/

import { useState, useEffect } from 'react'

function Calendar() {
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/ai/plan/calendar')
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => setPlan(data.plan))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const formatPlan = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim()
      if (!trimmed) return null

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} style={{ fontSize: '15px', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>
            {trimmed.replace('### ', '')}
          </h3>
        )
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} style={{ fontSize: '17px', fontWeight: '700', marginTop: '20px', marginBottom: '8px' }}>
            {trimmed.replace('## ', '')}
          </h2>
        )
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
        const content = trimmed.replace(/^\*\*|\*\*$/g, '')
        return (
          <h3 key={i} style={{ fontSize: '15px', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>
            {content}
          </h3>
        )
      }

      if (trimmed === '---') {
        return <hr key={i} style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
      }

      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('* ') || trimmed.startsWith('- ')
      const content = isBullet ? trimmed.replace(/^[•*\-]\s*/, '') : trimmed

      const renderInline = (str: string) =>
        str.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )

      if (isBullet) {
        return (
          <p key={i} style={{ marginBottom: '4px', paddingLeft: '16px' }}>
            • {renderInline(content)}
          </p>
        )
      }

      return (
        <p key={i} style={{ marginBottom: '8px' }}>
          {renderInline(trimmed)}
        </p>
      )
    })
  }

  if (error) return null

  return (
    <div className="card ai-section">
      <div className="today-chip">📅 Calendar Plan</div>
      <p className="section-label">Plan based on your calendar</p>
      {loading && <p className="no-tasks">Fetching your calendar...</p>}
      {plan && <div className="ai-plan">{formatPlan(plan)}</div>}
    </div>
  )
}

export default Calendar