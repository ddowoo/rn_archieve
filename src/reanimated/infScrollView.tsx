import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const CLASS_LIST = new Array(100).fill('').map((_, idx) => idx);

const ClassPage = () => (
  <FlatList
    style={{width, backgroundColor: 'green'}}
    data={CLASS_LIST}
    renderItem={({item}) => (
      <Flex center w="100%" h={40}>
        <Text>{item}</Text>
      </Flex>
    )}
  />
);

const NotePage = () => <Flex w={width} h="100%" bg="yellow" />;

const InfScrollView = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const sliderTransformX = useSharedValue(0);

  const toggleTitleIndex = (index: number) => setTitleIndex(index);

  const scrollHandler = useAnimatedScrollHandler(event => {
    sliderTransformX.value = event.contentOffset.x;
    runOnJS(toggleTitleIndex)(Math.round(event.contentOffset.x / width));
  });

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          sliderTransformX.value,
          [-width, 0, width],
          [-width / 2, 0, width / 2],
        ),
      },
    ],
  }));

  return (
    <Flex>
      {/* Title Tabs */}
      <Flex direction="row">
        {['수업', '노트'].map((title, index) => (
          <Flex key={title} fill={1} center h={30}>
            <Text
              style={{
                color: index === titleIndex ? 'green' : 'black',
                fontWeight: '700',
              }}>
              {title}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* Slider */}
      <Flex>
        <Animated.View style={[styles.slider, animatedSliderStyle]}>
          <Flex w="80%" center bg="red" h={3} />
        </Animated.View>
      </Flex>

      {/* Scrollable Content */}
      <Flex w="100%" h={400}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}>
          <ClassPage />
          <NotePage />
        </Animated.ScrollView>
      </Flex>
    </Flex>
  );
};

export default InfScrollView;

const styles = StyleSheet.create({
  slider: {
    height: 3,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
