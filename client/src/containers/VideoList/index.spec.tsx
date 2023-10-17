import { renderWithProviders } from '@/test'
import { screen, waitFor } from '@testing-library/react'
import VideoList from './index'
import { setupStore } from '@/store'
import { fetchAllVideoData } from '@/store/videoThunks'

describe('VideoList should render correctly', () => {
  it('Render VideoList container', async () => {
    renderWithProviders(<VideoList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('Render VideoList with data', async () => {
    const store = setupStore()
    await store.dispatch(fetchAllVideoData())

    renderWithProviders(<VideoList />, { store })
    await waitFor(() => screen.getByTestId('video-list'))
  })
})
