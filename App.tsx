import React from 'react';
import {StyleSheet} from 'react-native';

import Reanimated from './src/reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RNSkia from './src/rnSkia';

function App() {
  return (
    <GestureHandlerRootView>
      {/* <Reanimated /> */}
      <RNSkia />
    </GestureHandlerRootView>
  );
}

export default App;
