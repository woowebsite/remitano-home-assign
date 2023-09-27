import React from 'react'

type VideoCardProps = {
  title: string
  youtubeId: string
  description?: string
  createdBy?: { email: string }
}

const VideoCard: React.FC<VideoCardProps> = ({ title, youtubeId, description, createdBy }) => {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
      <div className='col-span-1 rounded-md overflow-hidden bg-gray-200'>
        <div className='relative pb-[56.25%]'>
          <iframe className='absolute top-0 left-0 w-full h-full' src={embedUrl} title={title} allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
        </div>
      </div>
      <div className='col-span-1'>
        <div>
          <h2 className='text-md font-bold mb-2 line-clamp-2'>{title}</h2>
          <p className='text-gray-500 mb-2'>
            <b>Shared by:</b> {createdBy?.email}
          </p>
          <p className='text-gray-500 line-clamp-5'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
