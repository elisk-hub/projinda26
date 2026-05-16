import { useState, useEffect } from 'react'
import { getAIPlanWithCalendar } from '../services/api'
import type { Task } from '../services/api'

interface AIPlanProps {
  tasks: Task[]  // Receives tasks from App.tsx
}

function AIPlan({ tasks }: AIPlanProps) {
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Re-fetch plan every time tasks change, always using Google Calendar
  useEffect(() => {
    setLoading(true)
    getAIPlanWithCalendar()
      .then(result => setPlan(result.plan))
      .finally(() => setLoading(false))
  }, [tasks])

  return (
    <section className="ai-section">
      <h3>AI Plan</h3>
      {loading && <p>Wait a second...</p>}
      {plan && <p className="ai-plan">{plan}</p>}
    </section>
  )
}

export default AIPlan