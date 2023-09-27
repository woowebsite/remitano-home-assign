import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '../store/userThunks';
import Button from '@/shared/components/Button';

const Logout = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return <Button onClick={handleLogout}>Logout</Button>
};

export default Logout;