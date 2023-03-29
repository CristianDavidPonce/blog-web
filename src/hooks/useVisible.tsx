import { useState } from 'react'

const useVisible = () => {
  const [visible, setVisible] = useState(false)
  const close = () => setVisible(false)
  const open = () => setVisible(true)
  const change = () => setVisible(!visible)
  return {
    visible,
    open,
    close,
    change,
  }
}

export default useVisible
