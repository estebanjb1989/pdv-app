import React, { useState, useMemo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useIsMobile } from '../../hook'
import { Container, Text, Spacer } from '../index'
import { FlatList } from 'react-native'
import styles from './styles'

const DataTable = ({
    keyField,
    dataSource,
    columns,
    itemsPerPage,
    detail,
    allowPagination,
}) => {
    const isMobile = useIsMobile()
    const [currentPage, setCurrentPage] = useState(1)
    const [detailVisible, setDetailVisible] = useState(null)

    const pageCount = useMemo(() => (
        Math.ceil(dataSource.length / itemsPerPage)
    ), [dataSource, itemsPerPage])

    const data = useMemo(() => {
        if (allowPagination) {
            return dataSource.slice(itemsPerPage * (currentPage - 1),
                (itemsPerPage * (currentPage - 1)) + itemsPerPage)
        }
        return dataSource
    }, [dataSource, itemsPerPage, allowPagination, currentPage])

    return (
        <Container>
            <FlatList
                keyExtractor={(item) => item[keyField]}
                data={data}
                ListHeaderComponent={!isMobile && (
                    <Container row>
                        {columns.map(col => (
                            <Container
                                key={col.key}
                                style={{
                                    width: col.width,
                                    ...StyleSheet.flatten(styles.headerCell),
                                }}
                                alignCenter
                            >
                                <Text.Small>{col.title}</Text.Small>
                            </Container>
                        ))}
                    </Container>
                )}
                renderItem={({ item }) => {
                    return (
                        <Container>
                            <Container row={!isMobile}>
                                {columns.map(col => {
                                    return (
                                        <Container style={{
                                            width: isMobile ? '100%' : col.width,
                                        }}>
                                            <Container
                                                key={col.key}
                                                fullWidth
                                                onPress={detail && (() => {
                                                    if (detailVisible === item[keyField]) {
                                                        setDetailVisible(null)
                                                        return
                                                    }

                                                    setDetailVisible(item[keyField])
                                                })}
                                            >
                                                <Container row={isMobile}>
                                                    {isMobile && (
                                                        <Container style={styles.headerCellMobile}>
                                                            <Text.Small>{col.title}</Text.Small>
                                                        </Container>
                                                    )}
                                                    <Container 
                                                        style={[
                                                            styles.rowCell,
                                                            !isMobile && styles.fixedHeight,
                                                        ]} 
                                                        fullWidth
                                                        alignEnd={!isMobile && col.alignEnd}
                                                    >
                                                        <Text.Small>{col.render?.(item) || item[col.key]}</Text.Small>
                                                    </Container>
                                                </Container>
                                            </Container>
                                        </Container>
                                    )
                                })}
                                <Spacer.Medium />
                            </Container>
                            {detailVisible === item[keyField] && (
                                <Container style={styles.detailContainer}>
                                    {detail(item)}
                                </Container>
                            )}
                        </Container>
                    )
                }}
            />
            {(allowPagination && pageCount > 1) &&
                <Container padded row justifyCenter alignCenter>
                    {currentPage > 1 && (
                        <Container row>
                            <TouchableOpacity onPress={() => {
                                setCurrentPage(1)
                            }}>
                                <Text.Small>◄◄</Text.Small>
                            </TouchableOpacity>
                            <Spacer.Medium />
                            <TouchableOpacity onPress={() => {
                                setCurrentPage(currentPage - 1)
                            }}>
                                <Text.Small>◄</Text.Small>
                            </TouchableOpacity>
                        </Container>
                    )}
                    <Spacer.Medium />
                    <Text.Small>{currentPage}/{pageCount}</Text.Small>
                    <Spacer.Medium />
                    {currentPage < pageCount && (
                        <Container row>
                            <TouchableOpacity onPress={() => {
                                setCurrentPage(currentPage + 1)
                            }}>
                                <Text.Small>►</Text.Small>
                            </TouchableOpacity>
                            <Spacer.Medium />
                            <TouchableOpacity onPress={() => {
                                setCurrentPage(pageCount)
                            }}>
                                <Text.Small>►►</Text.Small>
                            </TouchableOpacity>
                        </Container>
                    )}
                </Container>}
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
    detail: PropTypes.func,
    allowPagination: PropTypes.bool,
}

DataTable.defaultProps = {
    itemsPerPage: 12,
    detail: null,
    allowPagination: true,
}

export default DataTable