import React from 'react'
import { useCreateOne, useGetOptions } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { IOptions, permissionsUrl } from '../types'

interface IProps {
  onClose: () => void
}
const Create = (props: IProps) => {
  const form = useForm()
  const options = useGetOptions<IOptions>({ url: permissionsUrl })
  const mutation = useCreateOne({
    url: permissionsUrl,
    onSuccess: () => {
      props.onClose()
    },
  })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Crear Permiso' />
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
            Crear
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Create
