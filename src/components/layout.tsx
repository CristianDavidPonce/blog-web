import React from 'react'

import { SiteHeader } from '@/components/site-header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className='pt-4'>{children}</main>
    </>
  )
}
