import React, { useEffect } from 'react'
import { useEditOne, useGetOne } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { ITag, urlTags } from '../types'

interface IProps {
  onClose: () => void
  _id: string | number
}
const Editar = (props: IProps) => {
  const form = useForm()

  const mutation = useEditOne({
    url: urlTags,
    _id: props._id,
    onSuccess: () => {
      props.onClose()
    },
  })
  const data = useGetOne<ITag>({ url: urlTags, _id: props._id })

  useEffect(() => {
    if (data.data) {
      form.reset({ name: data.data.name })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Editar Tag' />
        <div className='p-9'>
          <Input name='name' label='Nombre' />
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
