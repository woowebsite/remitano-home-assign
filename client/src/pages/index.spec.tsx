import { render } from '@testing-library/react'
import Home from './index'

describe('Render Home page', () => {
  it('should render without crash', () => {
    const { getByTestId } = render(<Home />)
    const videoListElement = getByTestId('video-list') // Assuming you have a data-testid on the VideoList component
    expect(videoListElement).toBeInTheDocument()
  })
})
