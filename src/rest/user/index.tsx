import { useEffect } from 'react'
import { useRouter } from 'next/router'
import apiUser from '@/connections/apiUser'
import { useToast } from '@/hooks/use-toast'
import { IRootState } from '@/store/reducers'
import { IQueries, IQueryAction } from '@/store/reducers/query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import {
  IQueryResponse,
  IQueryResponseError,
  ITable,
  IWriteSuccess,
} from '@/types/types'

export const useGet = <T,>({
  url,
  params,
  onSuccess = () => null,
  enabled,
  persist = true,
  initialQuery,
  key,
}: {
  url: string
  params?: IQueries
  noUrl?: Boolean
  onSuccess?: (data: ITable<T>) => void
  enabled?: boolean
  initialQuery?: IQueries
  persist?: boolean
  key?: string
}) => {
  const query = useSelector<IRootState, IRootState['query']>(
    (state) => state.query
  )
  const { toast } = useToast()
  const dispatch = useDispatch<Dispatch<IQueryAction>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )

  const getTable = async (params?: IQueries) => {
    const { data } = await apiUser.get(url, {
      params: { ...params?.params, ...params?.filters },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data
  }

  const router = useRouter()

  useEffect(() => {
    const params = initialQuery
      ? { ...initialQuery }
      : { params: { limit: 10, page: 1 } }

    dispatch({
      type: 'reset',
      payload: { ...params, url: router.pathname },
    })
  }, [])

  return useQuery<ITable<T>, AxiosError<IQueryResponseError>>(
    [key || url, params !== undefined ? params : query],
    () => getTable(params !== undefined ? params : query),
    {
      enabled,
      onSuccess,
      refetchOnWindowFocus: false,
      onError: async (error) => {
        toast({
          description:
            error.response?.data.message || error.code || messages.unknownError,
        })
      },
    }
  )
}

export const useGetTable = <T,>({
  url,
  params,
  onSuccess = () => null,
  enabled,
  key,
  onError = () => null,
}: {
  url: string
  params?: IQueries
  onSuccess?: (data: ITable<T>) => void
  enabled?: boolean
  key?: string
  onError?: (e: AxiosError<IQueryResponseError>) => void
}) => {
  const getTable = async (params?: IQueries) => {
    const { data } = await apiUser.get(url, {
      params: { ...params?.params, ...params?.filters },
    })
    return data
  }
  const { toast } = useToast()
  return useQuery<ITable<T>, AxiosError<IQueryResponseError>>(
    [key || url, params],
    () => getTable(params),
    {
      enabled,
      onSuccess,
      refetchOnWindowFocus: false,
      onError: async (error) => {
        onError(error)
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useGetGraph = <T,>({
  url,
  params,
  onSuccess = () => null,
  enabled,
  key,
}: {
  url: string
  params?: IQueries
  onSuccess?: (data: T) => void
  enabled?: boolean
  key?: string
}) => {
  const getTable = async (params?: IQueries) => {
    const { data } = await apiUser.get(url, {
      params: { ...params?.params, ...params?.filters },
    })
    return data
  }
  const { toast } = useToast()
  return useQuery<T, AxiosError<IQueryResponseError>>(
    [key || url, params],
    () => getTable(params),
    {
      enabled,
      onSuccess,
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useGetOne = <T,>({
  url,
  _id,
  onSuccess = () => null,
  enabled,
  key,
  config,
  onError = () => null,
}: {
  url: string
  _id?: string
  onSuccess?: (data: T) => void
  enabled?: boolean
  key?: string
  config?: AxiosRequestConfig<any>
  onError?: (e: AxiosError<IQueryResponseError>) => void
}) => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  const getOne = async (_id?: string) => {
    const { data } = await apiUser.get<T>(_id ? `${url}/${_id}` : `${url}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data
  }

  return useQuery<T, AxiosError<IQueryResponseError>>(
    [key || `${url}/get-one`, _id],
    () => getOne(_id),
    {
      enabled,
      staleTime: 0,
      onSuccess,
      onError: (error) => {
        onError(error)
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useGetOptions = <T,>({
  url,
  noUrl,
  onSuccess = () => null,
}: {
  url: string
  noUrl?: boolean
  onSuccess?: (data: T) => void
}) => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  const getTable = async () => {
    const { data } = await apiUser.get(noUrl ? url : url + '/get/options', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data
  }

  return useQuery<T, AxiosError<IQueryResponseError>>(
    [url + '/get/options'],
    () => getTable(),
    {
      onSuccess,
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useDeleteOne = ({
  url,
  noUrl,
  onSuccess = () => null,
}: {
  url: string
  onSuccess?: () => void
  noUrl?: boolean
}) => {
  const queryClient = useQueryClient()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  const deleteOne = async (_id: string) => {
    const { data } = await apiUser.delete<IWriteSuccess>(
      noUrl ? url : url + '/' + _id,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    return data
  }

  return useMutation<IQueryResponse, AxiosError<IQueryResponseError>, string>(
    deleteOne,
    {
      onSuccess: (data) => {
        onSuccess()
        // message.success(data.message || messages.actionSuccess)
        queryClient.invalidateQueries({ queryKey: [url] })
        queryClient.refetchQueries()
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useCreateOne = <T,>({
  url,
  onSuccess = () => null,
  invalidate = true,
  config,
  onError = () => null,
  snack = true,
}: {
  url: string
  onSuccess?: (data: IQueryResponse) => void
  config?: AxiosRequestConfig<any>
  snack?: boolean
  onError?: (error: AxiosError<IQueryResponseError>) => void
  invalidate?: boolean
}) => {
  const queryClient = useQueryClient()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  return useMutation<IQueryResponse, AxiosError<IQueryResponseError, T>, T>(
    async (values) => {
      const { data } = await apiUser.post<IWriteSuccess>(url, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        ...config,
      })
      return data
    },
    {
      onSuccess: (resp) => {
        onSuccess(resp)
        if (invalidate) {
          queryClient.invalidateQueries({ queryKey: [url] })
          queryClient.refetchQueries()
        }

        // snack &&
        //   message.success({
        //     content: resp.message || messages.actionSuccess,
        //     style: { zIndex: 1500 },
        //   })
      },
      onError: (error) => {
        onError(error)
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const useEditOne = <T,>({
  url,
  noUrl,
  onSuccess = () => null,
  _id,
  invalidate = true,
  snack = true,
}: {
  url: string
  noUrl?: boolean
  onSuccess?: (data: IQueryResponse) => void
  _id: string
  invalidate?: boolean
  snack?: boolean
}) => {
  const queryClient = useQueryClient()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  return useMutation<IQueryResponse, AxiosError<IQueryResponseError, T>, T>(
    async (values) => {
      const { data } = await apiUser.put<IWriteSuccess>(
        noUrl ? url : `${url}/${_id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      return data
    },
    {
      onSuccess: (resp) => {
        onSuccess(resp)
        if (invalidate) {
          queryClient.invalidateQueries({ queryKey: [url] })
          queryClient.refetchQueries()
        }
        snack &&
          toast({
            description: resp.message || messages.actionSuccess,
          })
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

export const usePatchOne = <T,>({
  url,
  onSuccess = () => null,
  _id,
}: {
  url: string
  onSuccess?: (data: IQueryResponse) => void
  _id: string
}) => {
  const queryClient = useQueryClient()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const { toast } = useToast()
  return useMutation<IQueryResponse, AxiosError<IQueryResponseError, T>, T>(
    async (values) => {
      const { data } = await apiUser.patch<IWriteSuccess>(
        `${url}/${_id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      return data
    },
    {
      onSuccess: (resp) => {
        onSuccess(resp)
        queryClient.invalidateQueries({ queryKey: [url] })
        toast({
          description: resp.message || messages.actionSuccess,
        })
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description:
            error.response?.data.message || error.code || messages.unknownError,
          variant: 'destructive',
        })
      },
    }
  )
}

const messages = {
  unknownError: 'Error desconocido',
  actionSuccess: 'Se realizó la acción con éxito',
}
