import Link from 'next/link'
import router from 'next/router'
import { useCreateOne, useGetOne } from '@/rest/user'
import { IRootState } from '@/store/reducers'
import { IAuthUserAction } from '@/store/reducers/User/authUser'
import { Dispatch } from '@reduxjs/toolkit'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { IValidateToken } from '@/types/types'
import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import { ILoginForm } from './types'

const url = '/login'
const urlProfile = '/profile'
const Login = () => {
  const form = useForm<ILoginForm>()
  const dispatch = useDispatch<Dispatch<IAuthUserAction>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const validar = useGetOne<IValidateToken>({
    url: urlProfile,
    key: 'validatedash',
    enabled: user.token !== undefined,
    onSuccess: (data) => {
      dispatch({ type: 'setUser', user: data })
      router.push('/')
    },
  })
  const mutation = useCreateOne<ILoginForm>({
    url,
    snack: false,
    onSuccess: (data: any) => {
      dispatch({ type: 'setToken', token: data.access_token })
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
          Iniciar Sesión
        </h1>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Ingresa tus datos a continuación
        </p>
        <div className='h-3' />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((x) => mutation.mutate(x))}>
            <Input
              name='username'
              label='Usuario'
              focus
              rules={{ required: { message: 'Requerido', value: true } }}
            />
            <Input
              name='password'
              label='Contraseña'
              inputProps={{ type: 'password' }}
              rules={{ required: { message: 'Requerido', value: true } }}
            />
            {mutation.error && (
              <Callout type='danger'>
                {mutation.error.response?.data.message}
              </Callout>
            )}
            <Button
              className='w-full justify-center'
              type='submit'
              disabled={validar.isFetching || mutation.isLoading}
            >
              Ingresar
            </Button>
            <div className='h-4'></div>
            <div className='flex gap-2'>
              <p className=' text-sm text-slate-500'>No tienes una cuenta</p>
              <Link href={'./register'}>
                <p className={'text-sm text-blue-500'}>Regístrate</p>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
