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
    SearchSelect,
} from '@vallorisolutions/foa-design-system';
import { useFormik } from 'formik';
import React, { FC, useState, useEffect } from 'react';
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

    const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
    const [filteredEspecializations, setFilteredEspecializations] = useState<any[]>([]);

    const raceOptions = [
        {
            value: 'ORC',
            label: 'Orc',
        },
        {
            value: 'UNDEAD',
            label: 'Morto-Vivo / Undead',
        },
        {
            value: 'TAUREN',
            label: 'Tauren',
        },
        {
            value: 'TROLL',
            label: 'Troll',
        },
        {
            value: 'GOBLIN',
            label: 'Goblin',
        },
        {
            value: 'BLOOD ELF',
            label: 'Elfo Sangrento / Blood Elf',
        },
        {
            value: 'PANDAREN',
            label: 'Pandaren',
        },
        {
            value: 'NIGHTBORNE',
            label: 'Filho da Noite / Nightborne',
        },
        {
            value: 'HIGHMOUNTAIN TAUREN',
            label: 'Tauren Altamontês / Highmountain Tauren',
        },
        {
            value: `ORC MAG'HAR`,
            label: `Orc Mag'har`,
        },
        {
            value: `ZANDALARI TROLL`,
            label: `Zandalari Troll`,
        },
        {
            value: 'VULPERA',
            label: 'Vulpera',
        },
    ];

    const availableClasses = [
        {
            value: 'DEATH KNIGHT',
            label: 'Cavaleiro da Morte / Death Knight',
            races: [
                'ORC',
                'UNDEAD',
                'TAUREN',
                'TROLL',
                'GOBLIN',
                'BLOOD ELF',
                'PANDAREN',
                'NIGHTBORNE',
                'HIGHMOUNTAIN TAUREN',
                "ORC MAG'HAR",
                'ZANDALARI TROLL',
                'VULPERA',
            ],
        },
        {
            value: 'DEMON HUNTER',
            label: 'Caçador de Demônios / Demon Hunter',
            races: ['BLOOD ELF'],
        },
        {
            value: 'DRUID',
            label: 'Druida / Druid',
            races: ['HIGHMOUNTAIN TAUREN', 'TAUREN', 'TROLL', 'ZANDALARI TROLL'],
        },
        {
            value: 'HUNTER',
            label: 'Caçador / Hunter',
            races: [
                'ORC',
                'UNDEAD',
                'TAUREN',
                'TROLL',
                'GOBLIN',
                'BLOOD ELF',
                'PANDAREN',
                'NIGHTBORNE',
                'HIGHMOUNTAIN TAUREN',
                "ORC MAG'HAR",
                'ZANDALARI TROLL',
                'VULPERA',
            ],
        },
        {
            value: 'MAGE',
            label: 'Mago / Mage',
            races: raceOptions
                .filter((e) => e.value !== 'TAUREN' && e.value !== 'HIGHMOUNTAIN TAUREN')
                .map((e) => e.value),
        },
        {
            value: 'MONK',
            label: 'Monge / Monk',
            races: raceOptions.filter((e) => e.value !== 'GOBLIN').map((e) => e.value),
        },
        {
            value: 'PALADIN',
            label: 'Paladino / Paladin',
            races: ['TAUREN', 'ZANDALARI TROLL', 'BLOOD ELF'],
        },
        {
            value: 'PRIEST',
            label: 'Sacerdote / Priest',
            races: raceOptions
                .filter((e) => e.value !== 'ORC' && e.value !== 'HIGHMOUNTAIN TAUREN')
                .map((e) => e.value),
        },
        {
            value: 'ROGUE',
            label: 'Ladino / Rogue',
            races: raceOptions
                .filter((e) => e.value !== 'TAUREN' && e.value !== 'HIGHMOUNTAIN TAUREN')
                .map((e) => e.value),
        },
        {
            value: 'SHAMAN',
            label: 'Xamã / Shaman',
            RACES: raceOptions
                .filter((e) => e.value !== 'BLOOD ELF' && e.value !== 'UNDEAD' && e.value !== 'NIGHTBORNE')
                .map((e) => e.value),
        },
        {
            value: 'WARLOCK',
            label: 'Bruxo / Warlock',
            races: raceOptions
                .filter(
                    (e) =>
                        e.value !== 'TAUREN' &&
                        e.value !== 'HIGHMOUNTAIN TAUREN' &&
                        e.value !== `ORC MAG'HAR` &&
                        e.value !== 'ZANDALARI TROLL' &&
                        e.value !== 'PANDAREN',
                )
                .map((e) => e.value),
        },
        {
            value: 'WARRIOR',
            label: 'Guerreiro / Warrior',
            races: raceOptions.map((e) => e.value),
        },
    ];

    const availableEspecializations = [
        {
            value: 'ARMS',
            label: 'Arms / Armas',
            class: 'WARRIOR',
        },
        {
            value: 'FURY',
            label: 'Fury / Furia',
            class: 'WARRIOR',
        },
        {
            value: 'PROTECTION',
            label: 'Protection / Proteção',
            class: 'WARRIOR',
        },
        {
            value: 'BEASTMASTERY',
            label: 'Beast Mastery / Domínio das Feras',
            class: 'HUNTER',
        },
        {
            value: 'MARKSMANSHIP',
            label: 'Marksmanship / Precisão',
            class: 'HUNTER',
        },
        {
            value: 'SURVIVAL',
            label: 'Survival / Sobrevivência',
            class: 'HUNTER',
        },
        {
            value: 'ARCANE',
            label: 'Arcane / Arcano',
            class: 'MAGE',
        },
        {
            value: 'FIRE',
            label: 'Fire / Fogo',
            class: 'MAGE',
        },
        {
            value: 'FROST',
            label: 'Frost / Gelo',
            class: 'MAGE',
        },
        {
            value: 'HOLY',
            label: 'Holy / Sagrado',
            class: 'PALADIN',
        },
        {
            value: 'PROTECTION',
            label: 'Protection / Proteção',
            class: 'PALADIN',
        },
        {
            value: 'RETRIBUTION',
            label: 'Retribution / Reputação',
            class: 'PALADIN',
        },
        {
            value: 'DISCIPLINE',
            label: 'Discipline / Disciplina',
            class: 'PRIEST',
        },
        {
            value: 'HOLY',
            label: 'Holy / Sagrado',
            class: 'PRIEST',
        },
        {
            value: 'SHADOW',
            label: 'Shadow / Sombra',
            class: 'PRIEST',
        },
        {
            value: 'ASSASSINATION',
            label: 'Assassination / Assassinato',
            class: 'ROGUE',
        },
        {
            value: 'OUTLAW',
            label: 'Outlaw / Fora da Lei',
            class: 'ROGUE',
        },
        {
            value: 'SUBTLETY',
            label: 'Subtlety / Subterfugio',
            class: 'ROGUE',
        },
        {
            value: 'BREWMASTER',
            label: 'Brewmaster / Mestre Cervejeiro',
            class: 'MONK',
        },
        {
            value: 'MISTWEAVER',
            label: 'Mistweaver / Mistweaver',
            class: 'MONK',
        },
        {
            value: 'WINDWALKER',
            label: 'Windwalker / Andarilho do Vento',
            class: 'MONK',
        },
        {
            value: 'BALANCE',
            label: 'Balance / Equilíbrio',
            class: 'DRUID',
        },
        {
            value: 'FERAL',
            label: 'Feral / Feral',
            class: 'DRUID',
        },
        {
            value: 'GUARDIAN',
            label: 'Guardian / Guardião',
            class: 'DRUID',
        },
        {
            value: 'RESTORATION',
            label: 'Restoration / Restauração',
            class: 'DRUID',
        },
        {
            value: 'DEMONOLOGY',
            label: 'Demonology / Demonologia',
            class: 'WARLOCK',
        },
        {
            value: 'DESTRUCTION',
            label: 'Destruction / Destruição',
            class: 'WARLOCK',
        },
        {
            value: 'AFFLICTION',
            label: 'Affliction / Suplício',
            class: 'WARLOCK',
        },
        {
            value: 'HAVOC',
            label: 'Havoc / Devastação',
            class: 'DEMON HUNTER',
        },
        {
            value: 'VENGEANCE',
            label: 'Vengeance / Vingança',
            class: 'DEMON HUNTER',
        },
        {
            value: 'ELEMENTAL',
            label: 'Elemental / Elemental',
            class: 'SHAMAN',
        },
        {
            value: 'ENHANCEMENT',
            label: 'Enhancement / Aperfeiçoamento',
            class: 'SHAMAN',
        },
        {
            value: 'RESTORATION',
            label: 'Restoration / Restauração',
            class: 'SHAMAN',
        },
        {
            value: 'BLOOD',
            label: 'Blood / Sangue',
            class: 'DEATH KNIGHT',
        },
        {
            value: 'FROST',
            label: 'Frost / Gelo',
            class: 'DEATH KNIGHT',
        },
        {
            value: 'UNHOLY',
            label: 'Unholy / Profano',
            class: 'DEATH KNIGHT',
        },
    ];

    const handleRaceChange = (e: any): void => {
        formik.setFieldValue('class', null);
        setFilteredClasses([]);
        formik.setFieldValue('especialization', null);
        setFilteredEspecializations([]);
        if (e) {
            const classList: any = availableClasses.filter((c) => c.races?.includes(e.value));
            const aaa = classList.map((n: any) => {
                return {
                    label: n.label,
                    value: n.value,
                };
            });
            setFilteredClasses(aaa);
            formik.setFieldValue('race', e.value);
        } else {
            formik.setFieldValue('race', '');
        }
    };
    const handleClassChange = (e: any): void => {
        formik.setFieldValue('especialization', null);
        setFilteredEspecializations([]);
        if (e) {
            const espList: any = availableEspecializations.filter((c) => c.class === e.value);
            setFilteredEspecializations(espList);
            formik.setFieldValue('class', e.value);
        } else {
            formik.setFieldValue('class', '');
        }
    };
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
            race: Yup.string().required('Escolha a raça do seu personagem'),
            whatsapp: Yup.string().required('Digite seu whatsapp'),
            ilv: Yup.string().required('Digite seu item level'),
        }),
        validateOnBlur: true,
        validateOnChange: false,
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
    useEffect(() => {
        console.log('formik.values', formik.values);
    }, [formik]);
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
                                <SearchSelect
                                    label="Raça"
                                    name="race"
                                    placeholder="-- escolha um --"
                                    options={raceOptions}
                                    selectedValue={formik.values.race}
                                    setSelectedValue={(e): any => handleRaceChange(e)}
                                    isLoading={isLoading}
                                    messageError={formik.errors.race}
                                />
                            </Col>
                            <br />
                            {formik.values.race && formik.values.race.length > 0 && (
                                <>
                                    <Col size={12}>
                                        <SearchSelect
                                            label="Classe"
                                            name="class"
                                            options={filteredClasses}
                                            selectedValue={formik.values.class}
                                            setSelectedValue={(e): any => handleClassChange(e)}
                                            isLoading={isLoading}
                                            placeholder="-- escolha um --"
                                            messageError={formik.errors.class}
                                            isDisabled={!formik.values.race}
                                        />
                                    </Col>
                                    <br />
                                </>
                            )}
                            {formik.values.class && formik.values.class.length > 0 && (
                                <>
                                    <Col size={12}>
                                        <SearchSelect
                                            label="Especialização"
                                            name="especialization"
                                            placeholder="-- escolha um --"
                                            options={filteredEspecializations}
                                            selectedValue={formik.values.especialization}
                                            setSelectedValue={(e: any): any =>
                                                e ? formik.setFieldValue('especialization', e.value) : undefined
                                            }
                                            isLoading={isLoading}
                                            messageError={formik.errors.especialization}
                                            isDisabled={!formik.values.class}
                                        />
                                    </Col>
                                    <br />
                                </>
                            )}
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
