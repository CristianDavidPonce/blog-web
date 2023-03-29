import React from 'react'
import { useGetOne, useGetOptions } from '@/rest/user'
import { optionMatch } from '@/utils/optionMatch'
import { groupBy } from 'lodash'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/utils/Card'
import { IOptions, permissionsUrl } from '../Admin/Permissions/types'
import { IUser } from '../Admin/Users/types'
import EditProfile from './EditProfile'
import { url } from './EditProfile/types'

const Profile = () => {
  const data = useGetOne<IUser>({ url })
  const permisos = groupBy(data.data?.role.permissions, (x) => x.module)
  const options = useGetOptions<IOptions>({ url: permissionsUrl })
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='min-w-[400px]'>
        <h2 className='my-2 text-2xl font-semibold'>{'Perfil'}</h2>
      </div>
      <Tabs defaultValue='account' className='min-w-[400px] '>
        <TabsList>
          <TabsTrigger value='account'>Cuenta</TabsTrigger>
          <TabsTrigger value='permissions'>Permisos</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <p className='mb-4 text-sm text-slate-500 dark:text-slate-400'>
            Puedes editar los datos de tu cuenta aqui
          </p>
          <EditProfile />
          <div className='flex'></div>
        </TabsContent>
        <TabsContent value='permissions'>
          <div className='mb-2 flex items-center gap-2'>
            <Label>Rol:</Label>
            <p className='text-sm text-slate-700'>{data.data?.role.name}</p>
          </div>
          <div className='xs:grid-cols-1 mb-4 grid grid-cols-1 gap-4'>
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
                      <Switch checked />
                    </div>
                  )
                })}
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='password'>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Puedes cambiar tu contraseña aqui
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
