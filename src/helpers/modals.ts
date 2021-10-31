/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setDialogInfo } from '../store/modules/layout/actions';

export const useModals = (content: ReactNode): any => {
    const dispatch = useDispatch();
    const openPRDialog = (): void => {
        dispatch(
            setDialogInfo({
                width: 'auto',
                disableBackdropClick: true,
                isOpen: true,
                info: {
                    title: 'Nova requisição de compra',
                    subtitle: 'Preencha os dados abaixo para criar sua requisição',
                    children: content,
                },
            }),
        );
    };
    const openProductDialog = (): void => {
        dispatch(
            setDialogInfo({
                width: 'auto',
                disableBackdropClick: true,
                isOpen: true,
                info: {
                    title: 'Adicionar Produtos à sua requisição',
                    subtitle: 'Preencha os dados abaixo. Adicione quantos produtos desejar',
                    children: content,
                },
            }),
        );
    };

    const openCancelDialog = (): void => {
        dispatch(
            setDialogInfo({
                width: 'auto',
                disableBackdropClick: false,
                isOpen: true,
                info: {
                    title: 'Tem certeza de que deseja sair?',
                    subtitle:
                        'Podemos transformar esta requisição em Rascunho, o que você acha? Desta forma, você poderá voltar depois para terminar o que começou.',
                    children: content,
                },
            }),
        );
    };
    return { openProductDialog, openPRDialog, openCancelDialog };
};
