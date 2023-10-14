import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render as baseRender, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => baseRender(ui, { ...options }) as RenderResult

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
