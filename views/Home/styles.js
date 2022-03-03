import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
    menuItem: {
        width: 128,
        height: 128,
        borderColor: colors.tertiary,
        borderWidth: 1,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItemMobile: {
        width: '80%',
        height: 96,
        borderColor: colors.tertiary,
        borderWidth: 1,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
});

export default styles