import Link from 'next/link'
import router from 'next/router'
import { useCreateOne } from '@/rest/user'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import { ILoginForm } from './types'

const url = 'users/register/user'
const Register = () => {
  const form = useForm<ILoginForm>()

  const mutation = useCreateOne<ILoginForm>({
    url,
    onSuccess: (data: any) => {
      router.push('/login')
    },
  })
  return (
    <div className='flex h-screen items-center justify-center'>
      <div
        className={
          'self-center rounded-md border border-slate-100 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-800'
        }
        style={{ width: '100%', maxWidth: '24rem' }}
      >
        <h1 className='mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700'>
          Registrarse
        </h1>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Ingresa tus datos a continuación
        </p>
        <div className='h-3' />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
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
            <Input
              name='password'
              label='Contraseña'
              inputProps={{ type: 'password' }}
              rules={{ required: { value: true, message: 'Requerido' } }}
            />
            {mutation.error && (
              <Callout type='danger'>
                {mutation.error.response?.data.message}
              </Callout>
            )}
            <Button
              className='w-full justify-center'
              type='submit'
              disabled={mutation.isLoading}
            >
              Registrarse
            </Button>
            <div className='h-4'></div>
            <div className='flex gap-2'>
              <p className=' text-sm text-slate-500'>Ya tienes una cuenta</p>
              <Link href={'/login'}>
                <p className={'text-sm text-blue-500'}>Inicia sesión</p>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Register
