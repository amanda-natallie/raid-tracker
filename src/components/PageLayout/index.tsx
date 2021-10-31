import {
    LayoutWrapper,
    IconTicket,
    IconCredit,
    IconDashboard,
    FlexBox,
    colors,
    Button,
} from '@vallorisolutions/foa-design-system';
import React, { useState } from 'react';
import { useLogout, usePath, useUrl } from '../../helpers/utils';
import ReactLoading from 'react-loading';

const PageLayout: React.FC = ({ children }): JSX.Element => {
    const [isLoading] = useState(true);
    const [term, setTerm] = useState('');
    const { pathname, isActive } = usePath();
    const { navigate } = useUrl();

    return !isLoading ? (
        <LayoutWrapper
            searchPlaceholder={pathname === '/tickets' ? 'Digite o numero do ticket' : 'busque uma ordem de serviço'}
            menuItems={[
                {
                    title: 'Página Inicial',
                    onClick: (): void => navigate('/'),
                    icon: <IconDashboard />,
                    active: isActive('/'),
                },
                {
                    title: 'Tickets',
                    onClick: (): void => navigate('/tickets'),
                    icon: <IconTicket />,
                    active: isActive('/tickets'),
                },
                {
                    title: 'Ver Requisições',
                    onClick: (): void => navigate('/requisicoes-de-compra/'),
                    icon: <IconCredit />,
                    active: isActive('/requisicoes-de-compra/'),
                },
                {
                    title: 'Solicitar Cotação',
                    icon: <IconCredit />,
                    onClick: (): void => navigate('/solicitar-cotação/1548'),
                    active: isActive(`/solicitar-cotação/1548`),
                },
            ]}
            searchTerm={term}
            onChange={(e): void => setTerm(e.target.value)}
            user={{
                id: '',
                name: 'a',
                avatar: 'a',
                email: 'a',
                role: 'a',
            }}
            notifications={[
                {
                    id: '1',
                    title: 'Novo ticket',
                    description: 'Novo ticket criado',
                    icon: <IconTicket />,
                    url: 'https://femsa.com.br',
                },
                {
                    id: '2',
                    title: 'Ticket Atualizado',
                    description: 'Novo lote de canetas',
                    icon: <IconTicket />,
                    url: 'https://femsa.com.br',
                },
            ]}
            messages={[
                {
                    id: '1',
                    ticketId: '1',
                    title: 'Novo ticket',
                    description: 'Novo ticket criado',
                    url: 'https://femsa.com.br',
                },
            ]}
        >
            {children}
            <br />
            <br />
            <br />
            <br />
            <Button onClick={(): void => useLogout()}>Logout</Button>
        </LayoutWrapper>
    ) : (
        <FlexBox fullScreen verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.colors.red} />
        </FlexBox>
    );
};

export default PageLayout;
