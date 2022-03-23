import React from 'react'
import { Container } from '../component'
import { useNavigation } from '@react-navigation/native'

const useHeaderRight = (renderFn) => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Container style={{
                    paddingRight: 12,
                }}>
                    {renderFn()}
                </Container>
            ),
        })
    }, [navigation])

    return null
}

export default useHeaderRight