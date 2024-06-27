import {useEffect} from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

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

export default Opacity;
