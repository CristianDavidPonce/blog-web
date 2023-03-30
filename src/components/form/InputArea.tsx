import { useEffect, useRef } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import { Label } from '../ui/label'
import { Textarea, TextareaProps } from '../ui/textarea'

interface IProps {
  name: string
  label?: string
  inputProps?: TextareaProps
  optional?: boolean
  rules?: UseControllerProps['rules']
  defaultValue?: UseControllerProps['defaultValue']
  focus?: boolean
}

const InputArea = (props: IProps) => {
  const { name, inputProps, rules, defaultValue, focus = false, label } = props
  const { field, fieldState } = useController({ name, rules, defaultValue })
  const ref = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (focus) {
      ref.current?.focus({})
    }
  }, [focus])
  return (
    <div className={`mb-4 grid w-full items-center gap-1.5`}>
      {label && <Label>{label}</Label>}
      <Textarea
        ref={ref}
        onChange={field.onChange}
        value={field.value}
        {...(fieldState.error ? { className: 'border-red-500' } : {})}
        {...inputProps}
      />
      {fieldState.error && (
        <p className='text-sm text-red-500'>{fieldState.error.message}</p>
      )}
    </div>
  )
}
export default InputArea
