import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native'
import { Container, Text, Spacer, Loading, Button } from '../../component'
import { useBackButton, useHeaderTitle, useWorkingDay } from '../../hook'
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkingDay = () => {
    const [moneyBegin, setMoneyBegin] = React.useState(0)
    const [moneyEnd, setMoneyEnd] = React.useState(0)
    const [credentials, setCredentials] = React.useState(null)

    const {
        loadingWorkingDay,
        workingDay,
        refreshWorkingDay,
    } = useWorkingDay({
        refreshOnLoad: true,
    })

    useEffect(async () => {
        const creds = await AsyncStorage.getItem('@credentials')
        setCredentials(JSON.parse(creds))
    }, [setCredentials])

    useHeaderTitle("Jornada")
    useBackButton()

    const handleUpdate = async () => {
        const db = getDatabase();
        const reference = dbRef(db, 'workingDay');

        const payload = {
            ...workingDay,
            updatedAt: Date.now(),
            userEmail: credentials?.user?.email,
        }

        if (!workingDay?.started) {
            payload.started = true
            payload.finished = false
            payload.moneyBegin = moneyBegin
        }
        else {
            payload.started = false
            payload.finished = true
            payload.moneyEnd = moneyEnd
        }

        await set(reference, payload);
        refreshWorkingDay()
    }

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
            <Button.Primary width={240} title="Confirmar" onPress={handleUpdate} />
        </Container>
    );
}

export default WorkingDay
