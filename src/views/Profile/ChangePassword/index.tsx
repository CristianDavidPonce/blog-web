import React from 'react'
import { useEditOne } from '@/rest/user'
import { IEdit } from '@/views/Admin/Users/types'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import { url } from './types'

interface IProps {}
const ChangePassword = (props: IProps) => {
  const form = useForm<IEdit>()
  const mutation = useEditOne({
    url,
    _id: '',
    noUrl: true,
    onSuccess: () => {},
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
        <div className='max-w-md'>
          <Input
            name='lastPassword'
            label='Contraseña Antigua'
            inputProps={{ type: 'password' }}
            focus
            rules={{ required: { value: true, message: 'Requerido' } }}
          />
          <Input
            name='password'
            label='Contraseña Nueva'
            inputProps={{ type: 'password' }}
            rules={{ required: { value: true, message: 'Requerido' } }}
          />

          {mutation.error && (
            <Callout type='danger'>
              {mutation.error.response?.data.message}
            </Callout>
          )}
          <Button type='submit' disabled={mutation.isLoading}>
            Cambiar Contraseña
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ChangePassword
