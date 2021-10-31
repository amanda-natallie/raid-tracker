import { Card, Typography } from '@vallorisolutions/foa-design-system';
import React, { FC } from 'react';
import Illustration from './illustration';

interface EmptyCardProps {
    title: string;
    subtitle: string;
    full?: boolean;
}

const EmptyCard: FC<EmptyCardProps> = ({ title, subtitle, full = true }) => {
    return (
        <Card fullWidth={full} customStyles={{ height: '100%' }}>
            <Typography as="h4" variant="primary">
                {title}
            </Typography>
            <br />
            <Typography as="p" variant="secondary">
                {subtitle}
            </Typography>
            <br />
            <br />
            <Illustration />
        </Card>
    );
};

export default EmptyCard;
