import React from 'react';
import { FlatList } from 'react-native'
import { Container, Text } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const sales = useSelector(state => state.sales.list)
    useBackButton()
    useHeaderTitle('Ventas')

    return (
        <FlatList
            data={sales}
            keyExtractor={(item) => item.soldOutAt}
            renderItem={({ item }) => {
                return (
                    <Container padded>
                        <Container row spaceBetween>
                            <Container>
                                <Text.Body>
                                    {new Date(item.soldOutAt).toLocaleString()}
                                </Text.Body>
                            </Container>
                        </Container>
                        <Container style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: 'gold',
                        }} />
                    </Container>
                )
            }}
        />
    );
}

export default Inventory