import { renderWithProviders } from '@/test'
import { screen } from '@testing-library/react'
import Home from './index'
import { setupStore } from '@/store'

let store: any
describe('Render Home page', () => {
  beforeEach(() => {
    store = setupStore()
  })
  it('should render without crash', () => {
    const { container } = renderWithProviders(<Home />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    // expect(screen.getByTestId('video-list')).toBeInTheDocument()

    // const videoListElement = getByTestId('video-list') // Assuming you have a data-testid on the VideoList component
    // expect(videoListElement).toBeInTheDocument()
  })
})
