import { useWindowDimensions } from 'react-native'

const useIsMobile = () => {    
    const { width } = useWindowDimensions()

    return width < 400
}

export default useIsMobile