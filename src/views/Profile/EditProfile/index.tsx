import React, { useEffect } from 'react'
import { useEditOne, useGetOne } from '@/rest/user'
import { IEdit, IUser } from '@/views/Admin/Users/types'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import { url } from './types'

interface IProps {}
const EditProfile = (props: IProps) => {
  const form = useForm<IEdit>()
  const mutation = useEditOne({
    url,
    _id: '',
    noUrl: true,
    onSuccess: () => {},
  })
  const data = useGetOne<IUser>({ url })

  useEffect(() => {
    if (data.data) {
      form.reset({
        email: data.data.email,
        userName: data.data.userName,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
      })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <div className='max-w-md'>
          <Input
            name='firstName'
            label='Nombres'
            focus
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='lastName'
            label='Apellidos'
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='email'
            label='Email'
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='userName'
            label='Nombre de Usuario'
            rules={{ required: { value: true, message: 'Requerido' } }}
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

export default EditProfile
