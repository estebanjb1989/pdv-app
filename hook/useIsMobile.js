import { useWindowDimensions } from 'react-native'

const useIsMobile = () => {    
    const { width } = useWindowDimensions()

    return width < 420
}

export default useIsMobile