export interface IRecord {
  _id: string
  createdByName: string
  updatedByName: string
  business: string
  createdAt: string
  updatedAt: string
}

export interface ITelefono {
  telefono: string
  description: string
}
export interface IPerson {
  identification: string
  nombres: string
  apellido: string
  email: string
  completeName: string
  telefonos: ITelefono[]
}
export interface IModulo<T> {
  key: string
  label: string
  href: string
  icon: string
  items?: T[]
}
export interface IValidateToken extends IRecord, IPerson {
  role: {
    _id: string
    name: string
  }
  modulos: IModulo<IModulo<undefined>>[]
}

export interface ITable<T> {
  meta: {
    currentPage: number
    totalItems: number
    totalPages: number
    itemsPerPage: number
  }
  items: T[]
}

export interface IOption {
  value: string
  label: string
  tag?: string
  color?: string
}

export interface IQueryResponseError {
  code: string
  message: string
  errors?: any[]
}

export interface IQueryResponse {
  code: string
  message: string
  details?: any
  errors?: any[]
}

export interface IQueries {
  $limit: number
  $page?: number
  $sort?: string
  $qFields?: string
  $qValues?: string | null
  url?: string
}

export interface IWriteSuccess {
  code: string
  message: string
  details: {
    equipo: string
    message: string
    status: string
    agregados?: string
    errors?: {
      message: string
      codigo: string
      descripcion: string
    }[]
  }
}
