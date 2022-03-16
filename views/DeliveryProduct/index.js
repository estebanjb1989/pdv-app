import React, {
    useMemo
} from 'react'
import {
    FlatList
} from 'react-native'
import {
    useRoute
} from '@react-navigation/native'
import {
    useDispatch,
    useSelector,
} from 'react-redux'
import {
    useInventory,
    useBackButton,
    useHeaderTitle
} from '../../hook'
import {
    Container,
    Text,
    Loading
} from '../../component'
import bsActions from '../../redux/modules/bottomSheet'
import styles from './styles'
import { CartTypes } from '../../redux/types'

const DeliveryProduct = () => {
    const route = useRoute()
    const selectedCategory = route.params?.category
    const cart = useSelector(state => state.cart.list)

    const dispatch = useDispatch()
    useBackButton()
    useHeaderTitle(selectedCategory)

    const {
        loadingInventory,
        inventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    const products = useMemo(() => {
        return inventory
            .filter(item => item.category === selectedCategory)
    }, [inventory])

    if (loadingInventory) {
        return (
            <Loading />
        )
    }

    return (
        <Container alignCenter>
            <FlatList
                keyExtractor={(item) => item.description}
                data={products}
                renderItem={({ item }) => (
                    <Container
                        style={styles.menuItem}
                        onPress={() => {
                            dispatch({
                                type: CartTypes.SET_CART,
                                payload: [
                                    ...cart,
                                    item,
                                ]
                            })
                            dispatch(bsActions.open('Cart'))
                        }}
                    >
                        <Text.Small>
                            {item.description}
                        </Text.Small>
                    </Container>
                )}
            />
        </Container>
    )
}

export default DeliveryProduct