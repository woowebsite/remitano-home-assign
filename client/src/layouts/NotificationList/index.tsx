import { useAppSelector } from '@/store/hook'
import { NotifyData, selectors as notifySelector } from '@/store/notifySlice'
import Notification from './Notification'

const NotificationList = () => {
  const { notifies } = useAppSelector(notifySelector.notifyStateSelector)

  return (
    <>
      {notifies?.length > 0 && (
        <div className='z-20 fixed top-1 right-1 w-full max-w-md py-1 px-3'>
          {notifies.map((notify: NotifyData, idx: number) => (
            <Notification key={'notify_' + idx} {...notify} />
          ))}
        </div>
      )}
    </>
  )
}

export default NotificationList
