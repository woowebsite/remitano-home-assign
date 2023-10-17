import React, { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  className?: string
  type?: string
  disabled?: boolean
  testId?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, disabled, type = 'button', testId = 'button' }) => {
  const allClassName = `${className} justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
  return (
    <button disabled={disabled} className={allClassName} onClick={onClick} data-testid={testId}>
      {children}
    </button>
  )
}

export default Button
