import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles/globals.css'
import Header from '@/layouts/Header'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <div className='flex flex-col h-screen'>
        <Header />
        <main className='flex-1 mt-16'>
          <div className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </Provider>
  )
}

export default App
