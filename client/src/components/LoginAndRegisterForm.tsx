import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import React, { useState } from 'react';

interface LoginAndRegisterFormProps {
    onSubmit: (email: string, password: string) => void;
    isSubmitting: boolean;
}

const LoginAndRegisterForm: React.FC<LoginAndRegisterFormProps> = ({ isSubmitting, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-4">
                <div className="flex-1">
                    <Input type="email" value={email} onChange={handleEmailChange} placeholder='Email' required={true} className='w-full' />
                </div>
                <div className="flex-1">
                    <Input type="password" value={password} onChange={handlePasswordChange} placeholder='Password' required={true} className='w-full' />
                </div>
                <div className="flex-none">
                    <Button disabled={isSubmitting} type="submit" className='w-full'>Login/Register</Button>
                </div>
            </div>
        </form>
    );
};

export default LoginAndRegisterForm;