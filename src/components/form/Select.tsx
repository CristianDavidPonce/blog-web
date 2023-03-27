/* eslint-disable prefer-regex-literals */
import { useEffect, useRef } from 'react'
import Selector, { BaseSelectRef, SelectProps } from 'rc-select'
import { UseControllerProps, useController } from 'react-hook-form'

import { Label } from '../ui/label'

interface IProps {
  name: string
  label?: string
  selectProps?: SelectProps
  optional?: boolean
  rules?: UseControllerProps['rules']
  defaultValue?: UseControllerProps['defaultValue']
  focus?: boolean
}

const Select = (props: IProps) => {
  const { name, selectProps, rules, defaultValue, focus = false, label } = props
  const { field, fieldState } = useController({ name, rules, defaultValue })
  const ref = useRef<BaseSelectRef | null>(null)
  useEffect(() => {
    if (focus) {
      ref.current?.focus()
    }
  }, [focus])
  return (
    <div className={`mb-4 grid w-full items-center gap-1.5`}>
      {label && <Label>{label}</Label>}
      <Selector
        ref={ref}
        onChange={field.onChange}
        value={field.value}
        showSearch
        filterOption={(input, option) => {
          const option1 = rem(option?.label as string)
          return option1.toLowerCase().indexOf(rem(input)) >= 0
        }}
        notFoundContent={<>No hay datos</>}
        {...(fieldState.error ? { className: 'border-red-500' } : {})}
        {...selectProps}
      />
      {fieldState.error && (
        <p className='text-sm text-red-500'>{fieldState.error.message}</p>
      )}
    </div>
  )
}
export default Select

const rem = (s: string) => {
  let r = s.toLowerCase()
  r = r.replace(new RegExp(/\s/g), '')
  r = r.replace(new RegExp(/[àáâãäå]/g), 'a')
  r = r.replace(new RegExp(/æ/g), 'ae')
  r = r.replace(new RegExp(/ç/g), 'c')
  r = r.replace(new RegExp(/[èéêë]/g), 'e')
  r = r.replace(new RegExp(/[ìíîï]/g), 'i')
  r = r.replace(new RegExp(/ñ/g), 'n')
  r = r.replace(new RegExp(/[òóôõö]/g), 'o')
  r = r.replace(new RegExp(/œ/g), 'oe')
  r = r.replace(new RegExp(/[ùúûü]/g), 'u')
  r = r.replace(new RegExp(/[ýÿ]/g), 'y')
  r = r.replace(new RegExp(/\W/g), '')
  return r
}
