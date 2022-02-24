
import React from 'react'
import Container from '../index'
import colors from '../../constants/colors'

const Divider = () => {
    return (
        <Container style={
            {
                width: "90%",
                height: 1,
                backgroundColor: colors.text,
                opacity: 0.5,
            }
        }>

        </Container>
    )
}

export default Divider