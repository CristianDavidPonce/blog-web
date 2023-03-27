import React from 'react'
import { useCreateOne, useGetOptions, useGetTable } from '@/rest/user'
import { optionMatch } from '@/utils/optionMatch'
import { useSelections } from 'ahooks'
import { groupBy } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Callout } from '@/components/utils/Callout'
import { Card } from '@/components/utils/Card'
import Header from '@/components/utils/Header'
import { IPermission, url as permisosUrl } from '../../Permissions/types'
import { IOptions, url } from '../types'

interface IProps {
  onClose: () => void
}
interface IForm {
  name: string
  description?: string
}
const Create = (props: IProps) => {
  const form = useForm<IForm>()
  const permissions = useGetTable<IPermission>({
    url: permisosUrl,
    params: { params: { limit: 10000, page: 1 } },
  })

  const { selected, isSelected, toggle } = useSelections(
    permissions.data?.items.map((x) => x.id) || [],
    []
  )
  const permisos = groupBy(permissions.data?.items, (x) => x.module)

  const options = useGetOptions<IOptions>({ url: permisosUrl })
  const mutation = useCreateOne({
    url,
    onSuccess: () => {
      props.onClose()
    },
  })
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((x) =>
          mutation.mutate({ ...x, permissions: selected })
        )}
      >
        <Header
          onBack={props.onClose}
          title='Crear Rol'
          actions={
            <Button type='submit' disabled={mutation.isLoading}>
              Crear
            </Button>
          }
        />
        <div className='p-5'>
          <Input name='name' label='Nombre' />
          <Input name='description' label='Descripcion' />
          <div className='xs:grid-cols-1 mb-4 grid grid-cols-4 gap-4'>
            {Object.keys(permisos).map((x) => (
              <Card key={x}>
                <h3 className='font-medium'>
                  {optionMatch(x, options.data?.module)}
                </h3>
                {permisos[x]?.map((y) => {
                  return (
                    <div key={y.id} className='flex justify-between'>
                      <p className='text-sm'>
                        {optionMatch(y.action, options.data?.action)}
                      </p>
                      <Switch
                        checked={isSelected(y.id)}
                        onClick={() => toggle(y.id)}
                      />
                    </div>
                  )
                })}
              </Card>
            ))}
          </div>
          {mutation.error && (
            <Callout type='danger'>
              {mutation.error.response?.data.message}
            </Callout>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default Create
