import { useState } from 'react'

const useEdit = () => {
  const [visible, setVisible] = useState<string | undefined | number>()
  const close = () => setVisible(undefined)
  const open = (_id: string) => setVisible(_id)
  return {
    visible: Boolean(visible),
    open,
    close,
    value: visible,
  }
}

export default useEdit
