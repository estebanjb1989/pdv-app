import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native'
import { Container, Text, Spacer, Loading, Button } from '../../component'
import { useBackButton, useHeaderTitle, useWorkingDay } from '../../hook'
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkingDay = () => {
    const [moneyBegin, setMoneyBegin] = React.useState(0)
    const [moneyEnd, setMoneyEnd] = React.useState(0)
    const [credentials, setCredentials] = React.useState(null)

    const {
        loadingWorkingDay,
        workingDay,
        updateWorkingDay,
    } = useWorkingDay({
        refreshOnLoad: true,
    })

    useEffect(async () => {
        const creds = await AsyncStorage.getItem('@credentials')
        setCredentials(JSON.parse(creds))
    }, [setCredentials])

    useHeaderTitle("Jornada")
    useBackButton()

    if (loadingWorkingDay) {
        return (
            <Loading />
        )
    }

    return (
        <Container flex alignCenter justifyCenter>
            <Spacer.Small />
            {!workingDay?.started ? (
                <Container>
                    <Text.TitleH3>INICIO DE JORNADA</Text.TitleH3>
                    <Spacer.Medium />
                    <TextInput
                        defaultValue={workingDay?.moneyBegin}
                        placeholder="Dinero en caja"
                        autoFocus
                        keyboardType="numeric"
                        onChangeText={(text) => setMoneyBegin(parseFloat(text))}
                        style={{
                            width: 240,
                            height: 50,
                            paddingHorizontal: 12,
                            backgroundColor: 'whitesmoke',
                        }}
                    />
                </Container>
            ) :
                <Container>
                    <Text.TitleH3>FIN DE JORNADA</Text.TitleH3>
                    <Spacer.Medium />
                    <Text.Small>CAJA INICIAL: {workingDay?.moneyBegin} ARS</Text.Small>
                    <Spacer.Medium />
                    <Text.Small>DINERO EN CAJA</Text.Small>
                    <Spacer.Small />
                    <TextInput
                        defaultValue={workingDay?.moneyEnd}
                        placeholder="Dinero en caja"
                        autoFocus
                        keyboardType="numeric"
                        onChangeText={(text) => setMoneyEnd(parseFloat(text))}
                        style={{
                            width: 240,
                            height: 50,
                            paddingHorizontal: 12,
                            backgroundColor: 'whitesmoke',
                        }}
                    />
                </Container>
            }
            <Spacer.Medium />
            <Text.Body>{credentials?.user?.email}</Text.Body>
            <Spacer.Medium />
            <Button.Primary width={240} title="Confirmar" onPress={() => updateWorkingDay(moneyBegin, moneyEnd)} />
        </Container>
    );
}

export default WorkingDay
