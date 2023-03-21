import { StyleSheet } from 'react-native'
import colors from '../../constants/colors';

const shadow = {
    shadowColor: "lightgrey",
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
        backgroundColor: colors.dark2,
    },
    menuItemMobile: {
        width: 240,
        height: 80,
        borderRadius: 16,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.dark2,
    },
    menuItemLookup: {
        backgroundColor: colors.dark2,
        padding: 8,
        width: 260, 
        marginVertical: 8,
        marginHorizontal: 8,
    }
});

export default styles