import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

const styles = StyleSheet.create({
    menuItem: {
        width: 128,
        height: 128,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadow,
    },
    menuItemMobile: {
        width: '80%',
        height: 96,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        ...shadow,
    }
});

export default styles