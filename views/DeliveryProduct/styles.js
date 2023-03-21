import { StyleSheet } from 'react-native'
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    menuItem: {
        width: 260,
        height: 128,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.dark2,
    },
    menuItemMobile: {
        width: 260,
        height: 96,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: colors.dark2,
    }
});

export default styles