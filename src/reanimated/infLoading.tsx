import {useEffect} from 'react';
import {Box, Flex, HStack} from 'react-native-flex-layout';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedDot = ({delaySeconds}: {delaySeconds: number}) => {
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
        <AnimatedDot delaySeconds={0} />
        <AnimatedDot delaySeconds={100} />
        <AnimatedDot delaySeconds={200} />
      </HStack>
    </Flex>
  );
};

export default InfLoading;
