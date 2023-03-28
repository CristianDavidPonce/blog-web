import React from 'react'
import { useCreateOne, useGetTable } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import Header from '@/components/utils/Header'
import { IRol, urlRol } from '../../Roles/types'
import { url } from '../types'

interface IProps {
  onClose: () => void
}
const Create = (props: IProps) => {
  const form = useForm()
  const roles = useGetTable<IRol>({ url: urlRol })
  const mutation = useCreateOne({
    url,
    onSuccess: () => {
      props.onClose()
    },
  })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <Header onBack={props.onClose} title='Crear Usuario' />
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
          <Input
            name='phone'
            label='Telefono'
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='userName'
            label='Nombre de Usuario'
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='password'
            label='Contraseña'
            inputProps={{ type: 'password' }}
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
            Crear
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Create
