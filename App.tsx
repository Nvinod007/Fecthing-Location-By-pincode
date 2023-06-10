import { View, Text } from 'react-native'
import React from 'react'
import NearestDoctor from './src/NearestDoctor'

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <View style={{
        alignContent:'center',
        marginBottom:50,
        marginTop:50,
      }}>
      <NearestDoctor/>
      </View>
      
      
    </View>
  )
}

export default App