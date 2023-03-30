import React, { useEffect } from 'react'
import { useEditOne, useGetOne, useGetOptions } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { IOptions, IPermission, permissionsUrl } from '../types'

interface IProps {
  onClose: () => void
  _id: string | number
}
const Editar = (props: IProps) => {
  const form = useForm()
  const options = useGetOptions<IOptions>({ url: permissionsUrl })
  const mutation = useEditOne({
    url: permissionsUrl,
    _id: props._id,
    onSuccess: () => {
      props.onClose()
    },
  })
  const data = useGetOne<IPermission>({ url: permissionsUrl, _id: props._id })

  useEffect(() => {
    if (data.data) {
      form.reset({ module: data.data.module, action: data.data.action })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Editar Permiso' />
        <div className='mx-auto mt-10 flex max-w-[500px] flex-col'>
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
          <Button
            type='submit'
            disabled={mutation.isLoading}
            className='justify-center'
          >
            Editar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Editar
