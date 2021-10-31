import React from 'react';
import { Badge } from '@vallorisolutions/foa-design-system';
import { TicketStatus } from '../mocks/entities';

export const TicketStatusBadge = (status: TicketStatus): Record<string, React.ReactNode> | undefined => {
    return [
        {
            label: TicketStatus.Aberto,
            badge: <Badge label={String(TicketStatus.Aberto)} variant="blue" secondary bordered />,
        },
        {
            label: TicketStatus.Solucionado,
            badge: <Badge label={String(TicketStatus.Solucionado)} variant="green" secondary bordered />,
        },
        {
            label: TicketStatus.Cancelado,
            badge: <Badge label={String(TicketStatus.Cancelado)} variant="gray" secondary bordered />,
        },
        {
            label: TicketStatus['Aguardando Fornecedor'],
            badge: (
                <Badge label={String(TicketStatus['Aguardando Fornecedor'])} variant="light_blue" secondary bordered />
            ),
        },
        {
            label: TicketStatus.Respondido,
            badge: <Badge label={String(TicketStatus.Respondido)} variant="yellow" secondary bordered />,
        },
    ].find(({ label }) => label === status);
};
