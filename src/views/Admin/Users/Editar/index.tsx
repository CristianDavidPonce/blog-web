import React, { useEffect } from 'react'
import { useEditOne, useGetOne, useGetOptions } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { IOptions, IUser, url } from '../types'

interface IProps {
  onClose: () => void
  _id: string
}
const Editar = (props: IProps) => {
  const form = useForm()
  const options = useGetOptions<IOptions>({ url })
  const mutation = useEditOne({
    url,
    _id: props._id,
    onSuccess: () => {
      props.onClose()
    },
  })
  const data = useGetOne<IUser>({ url, _id: props._id })

  useEffect(() => {
    if (data.data) {
      form.reset({ module: data.data.module, action: data.data.action })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Editar Permiso' />
        <div className='p-5'>
          <Select
            name='module'
            label='Módulo'
            selectProps={{ options: options.data?.module }}
          />
          <Select
            name='action'
            label='Acción'
            selectProps={{ options: options.data?.action }}
          />
          {mutation.error && (
            <Callout type='danger'>
              {mutation.error.response?.data.message}
            </Callout>
          )}
          <Button type='submit' disabled={mutation.isLoading}>
            Editar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Editar
