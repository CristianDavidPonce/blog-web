import Link from 'next/link'
import { useRouter } from 'next/router'
import { IRootState } from '@/store/reducers'
import { IAuthUserAction } from '@/store/reducers/User/authUser'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Dispatch } from '@reduxjs/toolkit'
import { FileEdit, LogOut, Settings, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { siteConfig } from '@/config/site'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function SiteHeader() {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const dispatch = useDispatch<Dispatch<IAuthUserAction>>()
  const router = useRouter()
  return (
    <header className='sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900'>
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <MainNav items={siteConfig.mainNav} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <div className='flex gap-4'>
              {user.isValidated && (
                <Button
                  variant={'outline'}
                  onClick={() => {
                    router.push('/posts')
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <FileEdit className='h-4' />
                    Mis Posts
                  </div>
                </Button>
              )}
              <ThemeToggle />
              {user.isValidated ? (
                <div className='flex gap-4'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarFallback>CP</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={'/profile'}>
                        <DropdownMenuItem>
                          <User className='mr-2 h-4 w-4' />
                          Perfil
                        </DropdownMenuItem>
                      </Link>
                      <Link href={'/admin/home'}>
                        <DropdownMenuItem>
                          <Settings className='mr-2 h-4 w-4' />
                          Administración
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          dispatch({ type: 'resetAuth' })
                        }}
                      >
                        <LogOut className='mr-2 h-4 w-4' />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Link
                    href={siteConfig.links.github}
                    className={buttonVariants({
                      variant: 'outline',
                    })}
                  >
                    Registrarse
                  </Link>
                  <Link href={'./login'} className={buttonVariants({})}>
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
