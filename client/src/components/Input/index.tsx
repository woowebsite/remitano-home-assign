import React, { ChangeEvent } from 'react'

interface InputProps {
  value?: string
  placeholder?: string
  className?: string
  type?: string
  onChange: (value: string) => void
  required?: boolean
  pattern?: string
  testId?: string
}

const Input: React.FC<InputProps> = ({ onChange, value, placeholder, className, required, pattern, type = 'text', testId = 'input' }) => {
  const allClassName = `${className} block px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return <input pattern={pattern} required={required} type={type} className={allClassName} value={value} placeholder={placeholder} onChange={handleInputChange} data-testid={testId} />
}

export default Input
