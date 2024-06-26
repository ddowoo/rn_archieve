import {StyleSheet, View} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 80.0;
const CIRCLE_RADIUS = SIZE * 2;

const calculateDistance = (x: number, y: number) => {
  'worklet';
  return Math.sqrt(x * x + y * y);
};

const PanGesture = () => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    }),
    [],
  );

  const panGestureEvent = Gesture.Pan()
    .onStart(e => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      translationX.value = prevTranslationX.value + event.translationX;
      translationY.value = prevTranslationY.value + event.translationY;
    })
    .onFinalize(e => {
      const distance = calculateDistance(
        translationX.value,
        translationY.value,
      );

      if (distance > CIRCLE_RADIUS) {
        translationX.value = withSpring(0);
        translationY.value = withSpring(0);
      }
    });

  return (
    <Flex bg="#fff" items="center" justify="center">
      <View style={styles.circle}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[styles.square, animatedStyles]} />
        </GestureDetector>
      </View>
    </Flex>
  );
};

export default PanGesture;

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'green',
    borderRadius: 16,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 3,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
