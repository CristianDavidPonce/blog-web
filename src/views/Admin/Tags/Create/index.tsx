import React from 'react'
import { useCreateOne } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { urlTags } from '../types'

interface IProps {
  onClose: () => void
}
const Create = (props: IProps) => {
  const form = useForm()
  const mutation = useCreateOne({
    url: urlTags,
    onSuccess: () => {
      props.onClose()
    },
  })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Crear Tag' />
        <div className='p-9'>
          <Input name='name' label='Nombre' focus />
          {mutation.error && (
            <Callout type='danger'>
              {mutation.error.response?.data.message}
            </Callout>
          )}
          <Button type='submit' disabled={mutation.isLoading}>
            Crear
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Create
