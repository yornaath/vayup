import { Dimensions, Platform } from 'react-native'
const {height, width} = Dimensions.get('window')

const aspectRatio = height/width

export default () => 
  Platform.OS == "ios" && aspectRatio < 1.6