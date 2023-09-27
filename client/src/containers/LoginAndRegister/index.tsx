import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import LoginAndRegisterForm from '@/containers/LoginAndRegister/LoginAndRegisterForm'
import { loginOrRegister } from '@/store/userThunks'
import { selectors } from '@/store/userSlice'

const LoginAndRegister = () => {
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector(selectors.userStateSelector)
  const handleSubmit = (email: string, password: string) => {
    dispatch(loginOrRegister({ email, password }))
  }

  return <LoginAndRegisterForm isSubmitting={loading} onSubmit={handleSubmit} />
}

export default LoginAndRegister
