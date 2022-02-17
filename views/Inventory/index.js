import React from 'react';
import { FlatList } from 'react-native'
import { Container, Text } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const inventory = useSelector(state => state.inventory.list)
    useBackButton()
    useHeaderTitle('Inventario')
    return (
        <FlatList
            data={inventory}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <Container>
                    <Text.TitleH1>
                        ASD
                    </Text.TitleH1>
                </Container>
            )}
        />
    );
}

export default Inventory