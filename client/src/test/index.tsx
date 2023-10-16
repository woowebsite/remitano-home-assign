import type { PreloadedState } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { render as baseRender, RenderOptions, RenderResult } from '@testing-library/react'
import { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
export * from '@testing-library/react'

import { RootState, setupStore } from '@/store'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => baseRender(ui, { ...options }) as RenderResult

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: ToolkitStore
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// override render method
export { render, renderWithProviders }
