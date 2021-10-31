import { Typography } from '@vallorisolutions/foa-design-system';
import React from 'react';
import DashboardTiles from './dashboard';

const Dashboard: React.FC = (): JSX.Element => {
    const user = JSON.parse(localStorage.getItem('operator' || 'representative') || '');
    return (
        <>
            <Typography as="h1">Olá, {user.name}</Typography>
            <DashboardTiles />
        </>
    );
};

export default Dashboard;
