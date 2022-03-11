import React, {
    useMemo
} from 'react'
import {
    FlatList
} from 'react-native'
import {
    useNavigation
} from '@react-navigation/native'
import {
    useInventory,
    useBackButton,
    useHeaderTitle,
    useIsMobile,
} from '../../hook'
import {
    Container,
    Text,
    Loading
} from '../../component'
import styles from './styles'

const DeliveryCategory = () => {
    const navigation = useNavigation()

    useBackButton(null)
    useHeaderTitle('TuKiosko App')
    const isMobile = useIsMobile()

    const {
        loadingInventory,
        inventory,
        refreshInventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    const categories = useMemo(() => {
        return inventory
            .map(item => item.category)
            .filter((item, index, self) => self.indexOf(item) === index)
    }, [inventory])

    if (loadingInventory) {
        return (
            <Loading />
        )
    }

    return (
        <Container alignCenter>
            <FlatList
                keyExtractor={(item) => item}
                data={categories}
                renderItem={({ item }) => (
                    <Container
                        style={isMobile ? styles.menuItemMobile : styles.menuItem}
                        onPress={() => {
                            navigation.navigate('DeliveryProduct', {
                                category: item,
                            })
                        }}
                    >
                        <Text.Small>
                            {item}
                        </Text.Small>
                    </Container>
                )}
            />
        </Container>
    )
}

export default DeliveryCategory