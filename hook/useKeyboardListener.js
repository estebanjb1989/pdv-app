import React from 'react'
import { Platform } from 'react-native'

const useScanner = (onKeypress) => {    
    const handleKeypress = (ev) => {
        onKeypress(ev.key)
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