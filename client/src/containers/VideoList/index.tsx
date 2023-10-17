import { fetchAllVideoData } from '@/store/videoThunks'
import { VideoData } from '@/types/video'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useEffect } from 'react'
import VideoCard from './VideoCard'
import { selectors } from '@/store/videoSlice'

const VideoList = () => {
  const dispatch = useAppDispatch()
  const { videos, loading, error }: any = useAppSelector(selectors.videoStateSelector)

  useEffect(() => {
    dispatch(fetchAllVideoData())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div data-testid="video-list" className='max-w-4xl w-full  m-auto'>
      {videos.map((video: VideoData) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  )
}

export default VideoList
