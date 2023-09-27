import { shareVideoData } from '@/store/videoThunks'
import Button from '@/shared/components/Button'
import Input from '@/shared/components/Input'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import { resetSharedLinkStatus, selectors } from '@/store/videoSlice'
import { selectors as userSelector } from '@/store/userSlice'

const VideoShare = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { sharedLinkStatus, loading } = useAppSelector(selectors.videoStateSelector)
  const { user } = useAppSelector(userSelector.userStateSelector)

  const [sharedLink, setSharedLink] = useState<string>('')

  const handleNameChange = (value: string) => {
    setSharedLink(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(shareVideoData(sharedLink))
  }

  useEffect(() => {
    if (sharedLinkStatus === 'success') {
      router.push('/')
    }

    return () => {
      dispatch(resetSharedLinkStatus())
    }
  }, [dispatch, router, sharedLinkStatus, user])

  return (
    <fieldset className='border max-w-3xl w-full rounded-md border-solid border-gray-300 p-5 m-auto'>
      <legend className='px-2'>Share a Youtube movie</legend>
      <form onSubmit={handleSubmit}>
        {!user && <div className='p-3 text-center justify-center bg-red-100 border-red-100 mb-5 rounded-md border'>You must be logged in to share videos</div>}
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-800 md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
              Youtube URL
            </label>
          </div>
          <div className='md:w-2/3'>
            <Input placeholder='Please enter a valid YouTube link' pattern={'^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'} required={true} onChange={handleNameChange} className='w-full' />
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <Button disabled={loading || !user} type='submit' className='w-full'>
              {loading ? 'Sharing...' : 'Share'}
            </Button>
          </div>
        </div>
      </form>
    </fieldset>
  )
}

export default VideoShare
