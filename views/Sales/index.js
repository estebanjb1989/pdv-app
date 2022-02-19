import React from 'react';
import { FlatList } from 'react-native'
import { Container, Text } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const sales = []
    useBackButton()
    useHeaderTitle('Ventas')

    return (
        <FlatList
            data={sales}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return (
                    <Container padded>
                        <Container row spaceBetween>
                            <Container>
                                <Text.Body>
                                    {item.description}
                                </Text.Body>
                                <Text.Small>
                                    {item.category}
                                </Text.Small>
                            </Container>
                            <Text.Body>
                                {item.barcode}
                            </Text.Body>
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