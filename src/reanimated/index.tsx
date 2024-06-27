import {StyleSheet, View} from 'react-native';

import PanGesture from './panGesture';
import Opacity from './opacity';
import InfLoading from './infLoading';
import ScrollViewPro from './scrollViewPro';

const Reanimated = () => {
  return (
    <View style={styles.container}>
      {/* <Opacity /> */}
      {/* <InfLoading /> */}
      {/* <PanGesture /> */}
      <ScrollViewPro />
    </View>
  );
};

export default Reanimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
