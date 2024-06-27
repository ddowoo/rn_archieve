import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Box, Flex} from 'react-native-flex-layout';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const SIZE = width * 0.7;

const Page = ({
  title,
  index,
  offsetX,
}: {
  title: string;
  index: number;
  offsetX: SharedValue<number>;
}) => {
  const inputRange = [width * (index - 1), width * index, width * (index + 1)];

  const animatedCircleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetX.value, inputRange, [0, 1, 0]);
    const borderRadius = interpolate(offsetX.value, inputRange, [
      4,
      SIZE / 2,
      4,
    ]);
    const scale = interpolate(offsetX.value, inputRange, [0.4, 1, 0.4]);
    return {
      opacity,
      borderRadius,
      transform: [{scale}],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(offsetX.value, inputRange, [
      -SIZE * 1.3,
      0,
      SIZE * 1.3,
    ]);
    const opacity = interpolate(offsetX.value, inputRange, [0, 1, 0]);

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <Flex w={width} h={'100%'} center bg={`rgba(0,0,256, 0.${index + 2})`}>
      <Animated.View style={[styles.circle, animatedCircleStyle]}>
        <Animated.Text
          style={[
            {fontSize: 40, color: '#fff', fontWeight: '800'},
            animatedTextStyle,
          ]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Flex>
  );
};

const WORD_LIST = ['HELLO', 'MY', 'WORLD'];

const ScrollViewPro = () => {
  const scrollOffsetX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollOffsetX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={10}
      pagingEnabled
      onScroll={scrollHandler}>
      {WORD_LIST.map((word, index) => {
        return (
          <Page title={word} index={index} offsetX={scrollOffsetX} key={word} />
        );
      })}
    </Animated.ScrollView>
  );
};

export default ScrollViewPro;

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
