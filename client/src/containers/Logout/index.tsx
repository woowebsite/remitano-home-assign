import Button from '@/components/Button'
import { useAppDispatch } from '@/store/hook'
import { logout } from '@/store/userThunks'

const Logout = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout
