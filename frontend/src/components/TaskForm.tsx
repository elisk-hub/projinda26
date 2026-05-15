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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
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
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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