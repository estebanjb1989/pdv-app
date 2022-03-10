import React from 'react';
import { FlatList } from 'react-native'
import { Container, Text, Spacer, Divider, Loading } from '../../component'
import { useBackButton, useHeaderTitle, useIsMobile, useInventory } from '../../hook'

const Inventory = () => {
    useBackButton()
    useHeaderTitle('Inventario')
    const isMobile = useIsMobile()

    const {
        loadingInventory,
        inventory,
    } = useInventory()

    if (loadingInventory) {
        return <Loading />
    }

    return (
        <FlatList
            data={inventory}
            keyExtractor={(item) => item.barcode}
            renderItem={({ item }) => {
                return (
                    <Container padded>
                        <Container row={isMobile} spaceBetween>
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
                        <Divider />
                    </Container>
                )
            }}
        />
    );
}

export default Inventory