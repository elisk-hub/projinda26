import { useState } from 'react'

interface TaskFormProps {
  onSubmit: (task: {
    title: string
    description: string
    deadline: string
    priority: 'low' | 'medium' | 'high'
  }) => void
}

function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }

    if (title.length > 100) {
      setError('Title must be less than 100 characters.')
      return
    }

    if (!deadline) {
      setError('Please select a deadline.')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    if (deadline < today) {
      setError('Deadline cannot be in the past.')
      return
    }

    onSubmit({ title, description, deadline, priority })
    setTitle('')
    setDescription('')
    setDeadline('')
    setPriority('medium')
  }

  return (
    <div className="card">
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>Add new task</h3>

        {error && (
          <p style={{ color: '#9B2335', fontSize: '13px', background: '#FADADD', padding: '8px 12px', borderRadius: '8px' }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="form-row">
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add task</button>
      </form>
    </div>
  )
}

export default TaskForm