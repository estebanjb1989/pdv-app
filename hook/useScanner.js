import React from 'react'
import { Platform } from 'react-native'

const useScanner = (onScan) => {
    let buffer = ''

    const handleKeypress = (ev) => {
        if (buffer.length === 0 && ev.key !== '[') {
            return
        }
        
        if (ev.key === '[') {
            buffer = ''
        }

        buffer += ev.key

        if (ev.key === 'Enter') {
            //alert(buffer.substring(1, buffer.length - 5))
            const barcode = buffer.substring(1, buffer.length - 5)
            onScan(barcode)
            buffer = ''
        }
    }

    React.useEffect(() => {
        if (Platform.OS !== 'web') {
            return
        }
        document.addEventListener('keypress', handleKeypress)
        return () => {
            document.removeEventListener('keypress', handleKeypress)
        }
    }, [])

    return null
}

export default useScanner