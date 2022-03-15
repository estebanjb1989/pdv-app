import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    headerCell: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#4c5265',
        padding: 2,
    },
    headerCellMobile: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#4c5265',
        padding: 2,
        width: 72,
    },
    rowCell: {
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
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