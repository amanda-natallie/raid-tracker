/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FlexBox,
    Button,
    Card,
    Col,
    Input,
    Row,
    FEMSABrand,
    Typography,
    colors,
} from '@vallorisolutions/foa-design-system';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

const LoginPage: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('E-mail inválido').required('Required'),
            password: Yup.string().required('Digite sua senha'),
        }),
        onSubmit: () => undefined,
    });

    return (
        <Row
            customStyles={{
                width: '100vw',
                height: '100vh',
                background:
                    'url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/fde1e0111956835.600b3c0494613.png) top center no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Card customStyles={{ width: '500px', height: '600px', margin: 'auto' }}>
                <FEMSABrand />
                <Typography customStyles={{ marginTop: '20px', textAlign: 'center' }} as="h6">
                    Bem vindo ao FEMSA Orders Dashboard! <br /> Faça seu login para continuar.
                </Typography>
                <form
                    onSubmit={(e): any => e.preventDefault()}
                    style={{ marginLeft: '-5px', width: '500px', textAlign: 'left' }}
                >
                    <FlexBox customStyles={{ width: '100%' }} direction="column">
                        <Col size={12}>
                            <Input
                                label="E-mail"
                                name="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                messageError={formik.errors.email}
                            />
                        </Col>
                        <br />
                        <Col size={12}>
                            <Input
                                label="Senha"
                                name="password"
                                type="password"
                                placeholder="Digite sua senha"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                messageError={formik.errors.password}
                                showIconPassword
                            />
                        </Col>
                    </FlexBox>

                    <br />
                    <FlexBox
                        direction="row"
                        verticalAlign="flex-end"
                        horizontalAlign="flex-end"
                        customStyles={{ width: '100%', paddingBlock: 0 }}
                    >
                        <Button
                            style={{ marginRight: '20px', display: 'inline-block' }}
                            size="fluid"
                            small
                            variant="secondary"
                            onClick={(): any => undefined}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={(): any => undefined} size="fluid" small type="submit" variant="primary">
                            {isLoading ? <ReactLoading type="bars" color={colors.colors.white} height={25} /> : 'Logar'}
                        </Button>
                    </FlexBox>
                </form>
            </Card>
        </Row>
    );
};

export default LoginPage;
