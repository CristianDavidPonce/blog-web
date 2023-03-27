import { UseControllerProps, useController } from 'react-hook-form'

import { Label } from '../ui/label'
import { Switch as Check } from '../ui/switch'

interface IProps {
  name: string
  label?: string
  optional?: boolean
  rules?: UseControllerProps['rules']
  defaultValue?: UseControllerProps['defaultValue']
}

const Switch = (props: IProps) => {
  const { name, rules, defaultValue, label } = props
  const { field, fieldState } = useController({ name, rules, defaultValue })

  return (
    <div className={`mb-4 grid w-full items-center gap-1.5`}>
      {label && <Label>{label}</Label>}
      <Check
        onChange={field.onChange}
        value={field.value}
        {...(fieldState.error ? { className: 'border-red-500' } : {})}
      />
      {fieldState.error && (
        <p className='text-sm text-red-500'>{fieldState.error.message}</p>
      )}
    </div>
  )
}
export default Switch
