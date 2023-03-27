import React, { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Button } from '../ui/button'

interface IProps {
  title: string
  onBack?: () => void
  actions?: ReactNode
}
const Header = (props: IProps) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <div className='flex flex-row items-center justify-center gap-1'>
        {props.onBack && (
          <Button onClick={props.onBack} variant='ghost'>
            <ArrowLeft className='h-6 w-6' />
          </Button>
        )}
        <h2 className='text-2xl font-semibold'>{props.title}</h2>
      </div>
      {props.actions}
    </div>
  )
}

export default Header
