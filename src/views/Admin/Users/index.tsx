import React from 'react'
import useEdit from '@/hooks/useEdit'
import { useDeleteOne, useGet } from '@/rest/user'
import { useBoolean } from 'ahooks'
import { Delete, Edit, LucideMoreVertical } from 'lucide-react'
import moment from 'moment'

import { Table } from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Header from '@/components/utils/Header'
import Create from './Create'
import Editar from './Editar'
import { IUser, url } from './types'

const Users = () => {
  const data = useGet<IUser>({ url })
  const [create, setCreate] = useBoolean()
  const edit = useEdit()
  const borrar = useDeleteOne({ url })

  return (
    <div>
      {create && <Create onClose={setCreate.setFalse} />}
      {edit.visible && <Editar onClose={edit.close} _id={edit.value || ''} />}
      {!create && !edit.visible && (
        <>
          <Header
            title='Usuarios'
            actions={<Button onClick={setCreate.setTrue}>Crear</Button>}
          />
          <Table
            data={data.data}
            loading={data.isFetching}
            tableProps={{
              columns: [
                {
                  title: 'Creacion',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  width: 150,
                  ellipsis: true,
                  align: 'right',
                  render: (x, r) => (
                    <>
                      {x && moment(x).startOf('hour').fromNow()}
                      <br />
                      <p className='text-xs text-slate-500'>
                        {r.createdByName}
                      </p>
                    </>
                  ),
                },
                {
                  title: 'Usuario',
                  dataIndex: 'userName',
                  key: 'userName',
                  width: 200,
                  align: 'left',
                },
                {
                  title: 'Nombres',
                  dataIndex: 'firstName',
                  key: 'firstName',
                  width: 200,
                  align: 'left',
                },
                {
                  title: 'Apellidos',
                  dataIndex: 'lastName',
                  key: 'lastName',
                  width: 200,
                  align: 'left',
                },
                {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  width: 200,
                  align: 'left',
                },
                {
                  title: 'Activo',
                  dataIndex: 'isActive',
                  key: 'isActive',
                  width: 200,
                  align: 'left',
                },
                {
                  title: 'Rol',
                  dataIndex: ['role', 'name'],
                  key: 'rol',
                  width: 200,
                  align: 'left',
                },
                {
                  title: ' ',
                  dataIndex: 'id',
                  key: 'operations',
                  align: 'left',
                  fixed: 'right',
                  width: 100,
                  render: (x) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant={'outline'} size='sm'>
                          <LucideMoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            edit.open(x)
                          }}
                        >
                          <div className='flex items-center gap-2'>
                            <Edit className='h4 w-4' />
                            Editar
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            borrar.mutate(x)
                          }}
                        >
                          <div className='flex items-center gap-2'>
                            <Delete className='h4 w-4' />
                            Eliminar
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ),
                },
              ],
            }}
          />
        </>
      )}
    </div>
  )
}

export default Users
