/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FlexBox,
    Button,
    Card,
    Col,
    Input,
    Row,
    Typography,
    colors,
    Divider,
    Dialog,
} from '@vallorisolutions/foa-design-system';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
// import { api } from '../../api';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import logo from './logo.png';
import bg from './bg.jpg';
import { api } from '../../api';

const LoginPage: FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogInfo, setDialogInfo] = useState<any>({
        width: 'auto',
        disableBackdropClick: false,
        isOpen: false,
        info: {
            title: 'Obrigada pelo interesse em nossa',
            subtitle:
                'Em breve a RL vai entrar em contato com você. Por enquanto, fique atento(a) ao canal de regras da raid. Algumas coisas são obrigatórias para você participar da raid!',
            confirmButton: {
                title: 'Ok, entendi!',
                action: (): void => {
                    window.location.href = 'https://worldofwarcraft.com/';
                },
            },
            children: null,
        },
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            battleTag: '',
            charName: '',
            availableHours: '',
            class: '',
            especialization: '',
            race: '',
            whatsapp: '',
            ilv: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Digite seu nome'),
            battleTag: Yup.string().required('Digite sua battleTag'),
            charName: Yup.string().required('Digite o nome do seu personagem'),
            availableHours: Yup.string().required('Escolha um'),
            class: Yup.string().required('Digite a classe do seu personagem'),
            especialization: Yup.string().required('Digite a especialização do seu personagem'),
            race: Yup.string().required('Digite a raça do seu personagem'),
            whatsapp: Yup.string().required('Digite seu whatsapp'),
            ilv: Yup.string().required('Digite seu item level'),
        }),
        onSubmit: async () => {
            setIsLoading(true);
            try {
                await api.post('/prospects', formik.values);
                setDialogInfo({
                    width: 'auto',
                    disableBackdropClick: false,
                    isOpen: true,
                    info: {
                        title: 'Obrigada pelo interesse em nossa',
                        subtitle:
                            'Em breve a RL vai entrar em contato com você. Por enquanto, fique atento(a) ao canal de regras da raid. Algumas coisas são obrigatórias para você participar da raid!',
                        confirmButton: {
                            title: 'Ok, entendi!',
                            action: (): void => {
                                window.location.href = 'https://worldofwarcraft.com/';
                            },
                        },
                        children: null,
                    },
                });
            } catch (error) {
                alert('Erro ao realizar o cadastro');
            }
            setIsLoading(false);
        },
    });

    return (
        <>
            <Dialog {...dialogInfo} />
            <Row
                customStyles={{
                    width: '100vw',
                    height: '100vh',
                    background: `url(${bg}) top center no-repeat`,
                    backgroundSize: 'cover',
                    overflowY: 'auto',
                }}
            >
                <Card
                    customStyles={{
                        margin: 'auto',
                        maxWidth: '80vw',
                        marginBottom: 50,
                        backgroundColor: 'rgba(255,255,255, 0.95) !important',
                    }}
                    noPadding
                >
                    <img src={logo} alt="logo" style={{ width: '100%', display: 'inline-block' }} />
                    <Typography customStyles={{ marginTop: '20px', textAlign: 'center' }} as="h6">
                        Bem vindo ao Raid Tracker Beta.
                    </Typography>
                    <Typography customStyles={{ marginTop: '5px', textAlign: 'center' }} as="small">
                        Preencha as informações abaixo para continuar.
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ marginLeft: '-5px', textAlign: 'left' }}>
                        <FlexBox
                            customStyles={{ width: '90%', height: '100%', padding: '20px 0px', margin: 'auto' }}
                            direction="column"
                        >
                            <Divider borderColor={colors.text.secondary} />
                            <Typography as="h5" customStyles={{ textAlign: 'center' }}>
                                Seus dados
                            </Typography>
                            <Divider borderColor={colors.text.secondary} />
                            <Col size={12}>
                                <Input
                                    label="Seu nome"
                                    name="name"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    onChange={(e): any => formik.setFieldValue('name', e.target.value.toUpperCase())}
                                    value={formik.values.name}
                                    messageError={formik.errors.name}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Input
                                    label="Sua BattleTag"
                                    name="battleTag"
                                    type="text"
                                    placeholder="ex.: Natallie#11145"
                                    onChange={(e): any =>
                                        formik.setFieldValue('battleTag', e.target.value.toUpperCase())
                                    }
                                    value={formik.values.battleTag}
                                    messageError={formik.errors.battleTag}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Input
                                    label="Seu whatsapp"
                                    name="whatsapp"
                                    type="text"
                                    placeholder="ex.: (11) 9 1234-4569"
                                    onChange={(e): any =>
                                        formik.setFieldValue('whatsapp', e.target.value.toUpperCase())
                                    }
                                    value={formik.values.whatsapp}
                                    messageError={formik.errors.whatsapp}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Typography customStyles={{ marginTop: '5px', textAlign: 'left' }} as="label">
                                    Qual horário é melhor para você raidar?
                                </Typography>
                                <br />
                                <div style={{ width: '100%', paddingInline: '10px' }}>
                                    <input
                                        type="radio"
                                        name="availableHours"
                                        value="Terça a Quinta, 21h ~ 23h"
                                        onChange={(): any =>
                                            formik.setFieldValue('availableHours', 'Terça a Quinta, 21h ~ 23h')
                                        }
                                    />{' '}
                                    &nbsp; Terça a Quinta, 21h ~ 23h
                                    <br />
                                    <input
                                        type="radio"
                                        name="availableHours"
                                        value="Terça a Quinta, 22h ~ 00h"
                                        onChange={(): any =>
                                            formik.setFieldValue('availableHours', 'Terça a Quinta, 22h ~ 00h')
                                        }
                                    />{' '}
                                    &nbsp; Terça a Quinta, 22h ~ 00h
                                    <br />
                                    {formik.errors.availableHours && (
                                        <Typography
                                            customStyles={{
                                                color: colors.red,
                                                marginTop: '5px',
                                                textAlign: 'left',
                                            }}
                                            as="small"
                                        >
                                            {formik.errors.availableHours}
                                        </Typography>
                                    )}
                                </div>
                            </Col>

                            <Divider borderColor={colors.text.secondary} />
                            <Typography as="h5" customStyles={{ textAlign: 'center' }}>
                                Informações do personagem
                            </Typography>
                            <Divider borderColor={colors.text.secondary} />
                            <Col size={12}>
                                <Input
                                    label="Nome do seu personagem"
                                    name="charName"
                                    type="text"
                                    placeholder="ex.: Natallie"
                                    onChange={(e): any =>
                                        formik.setFieldValue('charName', e.target.value.toUpperCase())
                                    }
                                    value={formik.values.charName}
                                    messageError={formik.errors.charName}
                                />
                            </Col>
                            <br />

                            <Col size={12}>
                                <Input
                                    label="Classe"
                                    name="class"
                                    type="text"
                                    placeholder="ex.: Demon Hunter"
                                    onChange={(e): any => formik.setFieldValue('class', e.target.value.toUpperCase())}
                                    value={formik.values.class}
                                    messageError={formik.errors.class}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Input
                                    label="Especialização"
                                    name="especialization"
                                    type="text"
                                    placeholder="ex.: Tank - Vengeance"
                                    onChange={(e): any =>
                                        formik.setFieldValue('especialization', e.target.value.toUpperCase())
                                    }
                                    value={formik.values.especialization}
                                    messageError={formik.errors.especialization}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Input
                                    label="Raça"
                                    name="race"
                                    type="text"
                                    placeholder="ex.: Troll Zandalari"
                                    onChange={(e): any => formik.setFieldValue('race', e.target.value.toUpperCase())}
                                    value={formik.values.race}
                                    messageError={formik.errors.race}
                                />
                            </Col>
                            <br />
                            <Col size={12}>
                                <Input
                                    label="ILV do seu personagem"
                                    name="ilv"
                                    type="text"
                                    placeholder="ex.: 230"
                                    onChange={(e): any => formik.setFieldValue('ilv', e.target.value.toUpperCase())}
                                    value={formik.values.ilv}
                                    messageError={formik.errors.ilv}
                                />
                            </Col>
                        </FlexBox>

                        <br />
                        <FlexBox
                            direction="row"
                            verticalAlign="center"
                            horizontalAlign="center"
                            customStyles={{ width: '100%', paddingBlock: 0 }}
                        >
                            <Button
                                style={{ marginRight: '20px', display: 'inline-block' }}
                                size="fluid"
                                small
                                type="reset"
                                variant="secondary"
                                onClick={(): any => formik.resetForm()}
                            >
                                Resetar
                            </Button>
                            <Button onClick={undefined} size="fluid" small type="submit" variant="primary">
                                {isLoading ? (
                                    <ReactLoading type="bars" color={colors.colors.white} height={25} />
                                ) : (
                                    'Enviar'
                                )}
                            </Button>
                        </FlexBox>
                        <br />
                    </form>
                </Card>
            </Row>
        </>
    );
};

export default LoginPage;
