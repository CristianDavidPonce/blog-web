import { useMemo } from 'react'
import { IRootState } from '@/store/reducers'
import { IQueryAction } from '@/store/reducers/query'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Dispatch } from '@reduxjs/toolkit'
import { useBoolean, useSelections } from 'ahooks'
import { FilterIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { IOption } from '@/types/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface IFilter {
  title: string
  options?: IOption[]
  defaults?: string[]
  filter: string
}
const Filter = ({ title, options, defaults, filter }: IFilter) => {
  const list = useMemo(() => options, [options])
  const query = useSelector<IRootState, IRootState['query']>((x) => x.query)
  const { selected, isSelected, toggle, unSelectAll } = useSelections(
    list?.map((x) => x.value) || [],
    defaults || []
  )
  const dispatch = useDispatch<Dispatch<IQueryAction>>()
  const [open, setOpen] = useBoolean()

  return (
    <div className='flex justify-between'>
      {title}
      <DropdownMenu open={open}>
        <DropdownMenuTrigger onClick={setOpen.setTrue}>
          <span className='relative inline-block'>
            {query.filters &&
              (query.filters[filter]?.split(',').filter((x) => x !== '') || [])
                .length > 0 && (
                <span className='absolute top-0 right-0 mr-2 inline-flex translate-x-6 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'>
                  {query.filters && query.filters[filter]?.split(',').length}
                </span>
              )}
            <FilterIcon className='h-4 w-4' />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent onInteractOutside={(x) => setOpen.setFalse()}>
          {list?.map((x) => (
            <DropdownMenuCheckboxItem
              checked={isSelected(x.value)}
              onClick={async () => {
                toggle(x.value)
              }}
            >
              <div className='flex'>{x.label}</div>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <div className='m-2 flex gap-2'>
            <Button size={'sm'} variant='subtle' onClick={() => unSelectAll()}>
              Limpiar
            </Button>
            <Button
              size={'sm'}
              onClick={() => {
                dispatch({
                  type: 'filter',
                  payload: {
                    filters: {
                      ...query.filters,
                      ...{ [filter]: selected.toString() },
                    },
                  },
                })
                setOpen.setFalse()
              }}
            >
              Filtrar
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Filter
