import React from 'react';
import { FlatList, useWindowDimensions } from 'react-native'
import { Container, Text, Spacer } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const inventory = useSelector(state => state.inventory.list)
    useBackButton()
    useHeaderTitle('Inventario')
    const { width } = useWindowDimensions()

    return (
        <FlatList
            data={inventory}
            keyExtractor={(item) => item.barcode}
            renderItem={({ item }) => {
                return (
                    <Container padded>
                        <Container row={width > 400} spaceBetween>
                            <Container>
                                <Text.Body>
                                    {item.description}
                                </Text.Body>
                                <Text.Small>
                                    {item.category}
                                </Text.Small>                                
                            </Container>
                            <Container alignEnd>
                                <Text.Body>
                                    {item.barcode}
                                </Text.Body>
                                <Text.Body>
                                    {item.price || '?'} ARS
                                </Text.Body>
                                <Text.Body>
                                    Stock: {item.stock || 0}
                                </Text.Body>
                            </Container>
                        </Container>
                        <Spacer.Small />
                        <Container style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: 'lightgrey',
                        }} />
                    </Container>
                )
            }}
        />
    );
}

export default Inventory