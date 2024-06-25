import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Box, Flex, HStack} from 'react-native-flex-layout';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const LoadingBox = ({delaySeconds}: {delaySeconds: number}) => {
  const translateY = useSharedValue(0);

  const reanimtedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(translateY.value, [0, 0.5, 1], [0, -12, 0]),
      },
    ],
  }));

  useEffect(() => {
    setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withSpring(1, {
            duration: 2000,
            dampingRatio: 0.45,
          }),
          withTiming(1, {
            duration: 1000,
          }),
        ),
        Infinity,
        true,
      );
    }, delaySeconds);
  }, []);

  return (
    <Animated.View style={reanimtedStyle}>
      <Box w={6} h={6} radius={3} bg="green" mh={2} />
    </Animated.View>
  );
};

const InfLoading = () => {
  return (
    <Flex direction="row" mt={20}>
      <HStack spacing={10}>
        <LoadingBox delaySeconds={0} />
        <LoadingBox delaySeconds={100} />
        <LoadingBox delaySeconds={200} />
      </HStack>
    </Flex>
  );
};

// reanimated hook이 아닌 함수를 별도 사용시 js thread에서 실행되기 때문에 에러
const handleRoatation = (scaleAnimation: SharedValue<number>) => {
  'worklet'; // 워크렛 설정시 UI Thread에서 실행되는 JS 함수가 된다.

  return `${scaleAnimation.value * 2 * Math.PI}rad`;
};

const Opacity = () => {
  const opaicty = useSharedValue(0.3);
  const scale = useSharedValue(1);

  // reanimated 내부에서는 알아서 UI Thread에서 계산을 진행
  const reanimatedStyle = useAnimatedStyle(
    () => ({
      opacity: opaicty.value,
      transform: [{scale: scale.value}, {rotate: handleRoatation(scale)}],
    }),
    [],
  );

  useEffect(() => {
    opaicty.value = withRepeat(withSpring(1), 4, true);
    scale.value = withRepeat(withSpring(3), 4, true);
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: 30,
          height: 30,
          borderRadius: 12,
          backgroundColor: 'green',
        },
        reanimatedStyle,
      ]}></Animated.View>
  );
};

const Reanimated = () => {
  return (
    <View style={styles.container}>
      <Opacity />
      {/* <InfLoading /> */}
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
