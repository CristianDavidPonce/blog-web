import React from 'react'
import { IRootState } from '@/store/reducers'
import { IQueryAction } from '@/store/reducers/query'
import { Dispatch } from '@reduxjs/toolkit'
import Pagination from 'rc-pagination'
import Tabla, { TableProps } from 'rc-table'
import { useDispatch, useSelector } from 'react-redux'

import { ITable } from '@/types/types'
import Skeleton from '@/components/Skeleton'

const Table = <T extends object>(props: {
  data?: ITable<T>
  tableProps: TableProps<T>
  loading?: boolean
}) => {
  const query = useSelector<IRootState, IRootState['query']>(
    (state) => state.query
  )
  const dispatch = useDispatch<Dispatch<IQueryAction>>()

  const handleChangePage = (page: number, pageSize: number) => {
    dispatch({
      type: 'patch',
      payload: { params: { ...query.params, page, limit: pageSize } },
    })
  }
  return (
    <div className='flex h-[calc(100vh-160px)] flex-col justify-between'>
      <Tabla<T>
        data={props.data?.items}
        className='my-table'
        scroll={{ x: 500, y: 'calc(100vh - 230px)' }}
        emptyText={props.loading ? <Skeleton /> : 'Sin Datos 🥲'}
        {...props.tableProps}
      />
      <Pagination
        total={props.data?.meta.totalItems}
        current={props.data?.meta.currentPage}
        className={'flex justify-center'}
        onChange={handleChangePage}
      />
    </div>
  )
}

export default Table
