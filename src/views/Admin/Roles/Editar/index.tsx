import React, { useEffect } from 'react'
import { useEditOne, useGetOne, useGetOptions, useGetTable } from '@/rest/user'
import { optionMatch } from '@/utils/optionMatch'
import { useSelections } from 'ahooks'
import { groupBy } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/utils/Card'
import Header from '@/components/utils/Header'
import { IPermission, permissionsUrl } from '../../Permissions/types'
import { IOptions, IRol, urlRol } from '../types'

interface IProps {
  onClose: () => void
  _id: string | number
}
const Editar = (props: IProps) => {
  const form = useForm()

  const mutation = useEditOne({
    url: urlRol,
    _id: props._id,
    onSuccess: () => {
      props.onClose()
    },
  })
  const data = useGetOne<IRol>({ url: urlRol, _id: props._id })
  const permissions = useGetTable<IPermission>({
    url: permissionsUrl,
    params: {
      params: {
        limit: 10000,
        page: 1,
        order: JSON.stringify({ action: 'ASC' }),
      },
    },
  })

  const { selected, isSelected, toggle, setSelected } = useSelections(
    permissions.data?.items.map((x) => x.id) || [],
    []
  )

  useEffect(() => {
    if (data.data && selected.length === 0) {
      setSelected(data.data.permissions.map((x) => x.id))
    }
  }, [data.data])
  const permisos = groupBy(permissions.data?.items, (x) => x.module)

  const options = useGetOptions<IOptions>({ url: permissionsUrl })
  useEffect(() => {
    if (data.data) {
      form.reset({ name: data.data.name, description: data.data.description })
    }
  }, [data.data])
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((x) =>
          mutation.mutate({ ...x, permissions: selected })
        )}
      >
        <Header
          onBack={props.onClose}
          title='Editar Permiso'
          actions={
            <Button type='submit' disabled={mutation.isLoading}>
              Editar
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
        </div>
      </form>
    </FormProvider>
  )
}

export default Editar
