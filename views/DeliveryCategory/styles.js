import { StyleSheet } from 'react-native'
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    menuItem: {
        width: 128,
        height: 128,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.dark2
    },
    menuItemMobile: {
        width: 240,
        height: 96,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: colors.dark2
    }
});

export default styles