import React from 'react'
import { FlatList } from 'react-native'
import { Container, Text } from '../../component'

const Staff = () => {
    const members = [{
        id: 1,
        email: 'as@asd.com'
    }]

    return (
        <FlatList
            ListHeaderComponent={
                <Container>
                    <Text.TitleH3>INVITE LINKS</Text.TitleH3>
                </Container>
            }
            keyExtractor={(item) => item.email}
            data={members}
            renderItem={({ item }) => {
                return (
                    <Container>
                        <Text.Small>
                            {item.email}
                        </Text.Small>
                    </Container>
                )
            }}

        />
    )
}

export default Staff