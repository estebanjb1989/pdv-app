import React from 'react';
import { FlatList } from 'react-native'
import { Container, Text, Spacer } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'

const Inventory = () => {
    const sales = useSelector(state => state.sales.list)
    useBackButton()
    useHeaderTitle('Ventas')

    return (
        <FlatList
            data={sales.sort((a, b) => b.soldOutAt - a.soldOutAt)}
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
                            <Container>
                                <Text.Body>
                                    {item.credentials.user.email}
                                </Text.Body>
                            </Container>
                        </Container>
                        <Spacer.Medium />
                        {item.items.map(line => (
                            <Container row spaceBetween>
                                <Text.Body>
                                    - {line.description}
                                </Text.Body>
                                <Text.Body>
                                    {line.quantity} x {line.price} ARS = {line.quantity * line.price} ARS
                                </Text.Body>
                            </Container>
                        ))}
                        <Container style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: 'gold',
                            opacity: .5
                        }} />
                        <Container row justifyEnd>
                            <Text.TitleH3>
                                {item.total} ARS
                            </Text.TitleH3>
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