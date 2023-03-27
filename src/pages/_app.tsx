import type { AppProps } from 'next/app'
import { Inter as FontSans } from '@next/font/google'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'
import '@/styles/rc-pagination.css'
import '@/styles/rc-select.css'
import '@/styles/rc-table.css'
import { persistor, store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import 'moment/locale/es'
import moment from 'moment'

import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const queryClient = new QueryClient()
moment.locale('es')
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Component {...pageProps} />
              <Toaster />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  )
}
