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
                <Container row>
                    <Text.Small>
                        {item.description}
                    </Text.Small>
                    <Container style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'gold',
                    }} />
                </Container>
            )}
        />
    );
}

export default Inventory