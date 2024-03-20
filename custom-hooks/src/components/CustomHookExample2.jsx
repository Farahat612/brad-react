import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CustomHookExample2 = () => {
  const [tasks, setTasks] = useLocalStorage('task', [])
  const [task, setTask] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (task.trim() === '') return
    setTasks([...tasks, task])
    setTask('')
  }
  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Enter a task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type='submit' onClick={addTask}>
          Add Task
        </button>
      </form>
    </div>
  )
}

export default CustomHookExample2
