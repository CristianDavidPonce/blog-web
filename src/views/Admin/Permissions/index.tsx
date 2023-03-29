import React from 'react'
import useEdit from '@/hooks/useEdit'
import { useDeleteOne, useGet, useGetOptions } from '@/rest/user'
import { optionMatch } from '@/utils/optionMatch'
import { useBoolean } from 'ahooks'
import { Delete, Edit, LucideMoreVertical } from 'lucide-react'
import moment from 'moment'

import { Filter, Table } from '@/components/table'
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
import { IOptions, IPermission, permissionsUrl } from './types'

const Permissions = () => {
  const data = useGet<IPermission>({ url: permissionsUrl })
  const options = useGetOptions<IOptions>({ url: permissionsUrl })
  const [create, setCreate] = useBoolean()
  const edit = useEdit()
  const borrar = useDeleteOne({ url: permissionsUrl })

  return (
    <div>
      {create && <Create onClose={setCreate.setFalse} />}
      {edit.visible && <Editar onClose={edit.close} _id={edit.value || ''} />}
      {!create && !edit.visible && (
        <>
          <Header
            title='Permisos'
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
                  width: 50,
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
                  title: (
                    <Filter
                      title='Modulo'
                      options={options.data?.module}
                      filter='modules'
                    />
                  ),
                  dataIndex: 'module',
                  key: 'module',
                  width: 100,
                  align: 'left',
                  render: (x) => optionMatch(x, options.data?.module),
                },
                {
                  title: (
                    <Filter
                      title='Acciones'
                      options={options.data?.action}
                      filter='actions'
                    />
                  ),
                  dataIndex: 'action',
                  key: 'action',
                  width: 100,
                  render: (x) => optionMatch(x, options.data?.action),
                },
                {
                  title: ' ',
                  dataIndex: 'id',
                  key: 'operations',
                  align: 'left',
                  width: 50,
                  fixed: 'right',
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

export default Permissions
