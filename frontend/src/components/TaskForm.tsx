import { useState } from 'react'

// Defines what data the form will send back to the parent component
interface TaskFormProps {
  onSubmit: (task: {
    title: string
    description: string
    deadline: string
    priority: 'low' | 'medium' | 'high'
  }) => void
}

function TaskForm({ onSubmit }: TaskFormProps) {
  // State for each input field - stores what the user types
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  // Called when the user clicks "Add task"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevents page from reloading
    if (!title) return // Don't submit if title is empty
    onSubmit({ title, description, deadline, priority }) // Send data to parent
    // Reset all fields after submit
    setTitle('')
    setDescription('')
    setDeadline('')
    setPriority('medium')
  }

  return (
    // Form with inputs for each task field
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add new task</h3>

      {/* Title input - required */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description input - optional */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Deadline date picker */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      {/* Priority dropdown - low, medium or high */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add task</button>
    </form>
  )
}

export default TaskForm