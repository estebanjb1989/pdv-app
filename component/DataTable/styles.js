import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
    headerCell: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: colors.primary,
        padding: 2,
    },
    headerCellMobile: {
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: 'grey',
        backgroundColor: colors.dark2,
        padding: 4,
        width: 80,
    },
    rowCellMobile: {
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingVertical: 8,
    },
    rowCell: {
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
    },
    rowCellText: {
        color: 'black'
    },
    detailContainer: {
        paddingLeft: 32,
        paddingBottom: 12,
    },
    fixedHeight: {
        height: 22,
    }
})

export default styles