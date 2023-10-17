import { renderWithProviders } from '@/test'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import VideoShare from './index'
import { setupStore } from '@/store'
import { fetchAllVideoData } from '@/store/videoThunks'
import Share from '@/pages/share'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

describe('Share Page', () => {
  it('should render without errors', () => {
    const { container } = renderWithProviders(<Share />)
    expect(screen.getByText('Share a Youtube movie')).toBeInTheDocument()
    expect(container).toBeTruthy()
  })

  it('Render VideoShare container', async () => {
    const store = setupStore()
    const { container } = renderWithProviders(<VideoShare />, { store })

    await waitFor(() => screen.getByTestId('share-link'))
    const sharedLink = 'https://www.youtube.com/watch?v=1ORkjE7rMAM'
    const input = screen.getByTestId('share-link')
    act(() => {
      fireEvent.change(input, {
        target: {
          value: sharedLink,
        },
      })
    })
    expect(input).toHaveValue(sharedLink)

    await waitFor(() => screen.getByTestId('button-share'))
    const shareButton = screen.getByTestId('button-share')
    await waitFor(() => userEvent.click(shareButton))

    expect(container).toBeTruthy()
  })
})
