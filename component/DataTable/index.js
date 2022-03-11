import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text, Spacer } from '../index'
import { FlatList } from 'react-native'
import styles from './styles'

const DataTable = ({
    keyField,
    dataSource,
    columns,
    itemsPerPage,
}) => {
    const [currentPage, setCurrentPage] = useState(1)

    const pageCount = Math.ceil(dataSource.length / itemsPerPage)
    return (
        <Container padded>
            <FlatList
                keyExtractor={(item) => item[keyField]}
                data={dataSource.slice(itemsPerPage * (currentPage - 1), (itemsPerPage * (currentPage - 1)) + itemsPerPage)}
                ListHeaderComponent={(
                    <Container row spaceBetween>
                        {columns.map(col => (
                            <Container key={col.key} style={{
                                width: col.width,
                                ...StyleSheet.flatten(styles.headerCell),
                            }} alignCenter>
                                <Text.Small>{col.title}</Text.Small>
                            </Container>
                        ))}
                    </Container>
                )}
                renderItem={({ item }) => (
                    <Container row spaceBetween>
                        {columns.map(col => (
                            <Container key={col.key} style={{
                                width: col.width,
                                ...StyleSheet.flatten(styles.rowCell),
                            }} alignEnd={col.alignEnd}>
                                <Text.Small>{item[col.key]}</Text.Small>
                            </Container>
                        ))}
                    </Container>
                )}
            />
            <Container padded row justifyCenter alignCenter>
                {currentPage > 1 && <TouchableOpacity onPress={() => {
                    setCurrentPage(currentPage - 1)
                }}>
                    <Text.Small>Ant.</Text.Small>
                </TouchableOpacity>}
                <Spacer.Medium />
                <Text.Small>Pag. {currentPage}/{pageCount}</Text.Small>
                <Spacer.Medium />
                {currentPage < pageCount &&
                    <TouchableOpacity onPress={() => {
                        setCurrentPage(currentPage + 1)
                    }}>
                        <Text.Small>Prox.</Text.Small>
                    </TouchableOpacity>}
            </Container>
        </Container>
    )
}

DataTable.propTypes = {
    keyField: PropTypes.string.isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        width: PropTypes.string,
    })).isRequired,
    itemsPerPage: PropTypes.number,
}

DataTable.defaultProps = {
    itemsPerPage: 15,
}

export default DataTable