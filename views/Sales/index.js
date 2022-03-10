import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import { Container, Text, Spacer, Loading, Divider } from '../../component'
import { useBackButton, useHeaderTitle, useIsMobile } from '../../hook'
import { useSelector, useDispatch } from 'react-redux'
import { SalesTypes } from '../../redux/types'
import { fetchSales } from '../../services/firebase'

const Sales = () => {
    const [loadingSales, setLoadingSales] = useState(false)
    const sales = useSelector(state => state.sales.list)
    const dispatch = useDispatch()
    useBackButton()
    useHeaderTitle('Ventas')
    const isMobile = useIsMobile()

    useEffect(() => {
        setLoadingSales(true)
        fetchSales(
            (data) => {
                setLoadingSales(false)
                dispatch({
                    type: SalesTypes.SET_SALES,
                    payload: Object.keys(data).map(key => data[key])
                })
            },
            (err) => {
                setLoadingSales(false)
                console.log(err)
            }
        )
    }, [])

    if (loadingSales) {
        return <Loading />
    }

    return (
        <FlatList
            data={sales.sort((a, b) => b.soldOutAt - a.soldOutAt)}
            keyExtractor={(item) => item.soldOutAt}
            renderItem={({ item }) => {
                return (
                    <Container padded>
                        <Container row={isMobile} spaceBetween>
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
                                    {line.description}
                                </Text.Body>
                                <Container alignEnd>
                                    <Text.Body>
                                        {line.quantity} x {line.price} ARS =

                                </Text.Body>
                                    <Text.Body>
                                        {line.quantity * line.price} ARS
                                </Text.Body>
                                </Container>
                            </Container>
                        ))}
                        <Divider />
                        <Container row justifyEnd>
                            <Text.TitleH3>
                                {item.total} ARS
                            </Text.TitleH3>
                        </Container>
                        <Divider />
                    </Container>
                )
            }}
        />
    );
}

export default Sales