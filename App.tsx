import React from 'react';
import {StyleSheet} from 'react-native';

import Reanimated from './src/reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView>
      <Reanimated />
    </GestureHandlerRootView>
  );
}

export default App;
