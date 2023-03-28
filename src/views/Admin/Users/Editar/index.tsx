import React, { useEffect } from 'react'
import { useEditOne, useGetOne, useGetTable } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { IRol, urlRol } from '../../Roles/types'
import { IEdit, IUser, url } from '../types'

interface IProps {
  onClose: () => void
  _id: string
}
const Editar = (props: IProps) => {
  const form = useForm<IEdit>()
  const roles = useGetTable<IRol>({ url: urlRol })
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
      form.reset({
        email: data.data.email,
        userName: data.data.userName,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        isActive: data.data.isActive,
        role: data.data.role.id,
      })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Editar Permiso' />
        <div className='max-w-md px-9'>
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
          <Input name='phone' label='Telefono' />
          <Input
            name='userName'
            label='Nombre de Usuario'
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Select
            name='role'
            label='Rol'
            rules={{ required: { value: true, message: 'Requerido' } }}
            selectProps={{
              options: roles.data?.items.map((x) => ({
                label: x.name,
                value: x.id,
              })),
            }}
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
