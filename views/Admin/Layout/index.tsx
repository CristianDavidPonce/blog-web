import React, { ReactNode } from 'react'
import Link from 'next/link'
import { CheckCheck, File, Home, Mic, Tags, UserCog, Users } from 'lucide-react'

import { SiteHeader } from '@/components/site-header'
import { buttonVariants } from '@/components/ui/button'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className='grid grid-cols-4 xl:grid-cols-5'>
        <aside className='h-screen border-r border-r-slate-200 p-2 dark:border-r-slate-700'>
          <Item
            label='Inicio'
            href='/admin/permissions'
            icon={<Home className='h-4 w-4' />}
          />
          <h3 className='m-2 font-semibold'>Blog</h3>
          <Item
            label='Articulos'
            href='/admin/permissions'
            icon={<File className='h-4 w-4' />}
          />
          <Item
            label='Comentarios'
            href='/admin/permissions'
            icon={<Mic className='h-4 w-4' />}
          />
          <Item
            label='Tags'
            href='/admin/permissions'
            icon={<Tags className='h-4 w-4' />}
          />
          <h3 className='m-2 font-semibold'>Configuraciones</h3>
          <Item
            label='Permisos'
            href='/admin/permissions'
            icon={<CheckCheck className='h-4 w-4' />}
          />
          <Item
            label='Roles'
            href='/admin/permissions'
            icon={<UserCog className='h-4 w-4' />}
          />
          <Item
            label='Usuarios'
            href='/admin/permissions'
            icon={<Users className='h-4 w-4' />}
          />
        </aside>
        <div className='col-span-3 p-5 xl:col-span-4'>{children}</div>
      </div>
    </>
  )
}
interface IItem {
  label: string
  href: string
  icon: ReactNode
}
const Item = (props: IItem) => {
  return (
    <Link
      href={props.href}
      className={buttonVariants({
        variant: 'ghost',
        className: 'w-full justify-start',
      })}
    >
      <div className='flex items-center justify-start gap-3'>
        {props.icon}
        {props.label}
      </div>
    </Link>
  )
}
