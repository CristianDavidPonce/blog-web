import Head from 'next/head'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/button'

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <meta
          name='description'
          content='Next.js template for building apps with Radix UI and Tailwind CSS'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='container grid items-center gap-6 pt-6 pb-8 md:py-10'>
        <div className='flex max-w-[980px] flex-col items-start gap-2'>
          <h1 className='text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl'>
            Escribe artículos gratis <br className='hidden sm:inline' />
          </h1>
          <p className='max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl'>
            Empieza ahora mismo
          </p>
        </div>
        <div className='flex gap-4'>
          <Link href={'./login'} className={buttonVariants({ size: 'lg' })}>
            Iniciar Sesión
          </Link>
          <Link
            target='_blank'
            rel='noreferrer'
            href={siteConfig.links.github}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Registrarse
          </Link>
        </div>
      </section>
    </Layout>
  )
}
