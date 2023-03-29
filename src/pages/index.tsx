import Head from 'next/head'
import Home from '@/views/Home'

import { Layout } from '@/components/layout'

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
      <Home />
    </Layout>
  )
}
