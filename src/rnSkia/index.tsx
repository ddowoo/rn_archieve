import React from 'react';
import {Canvas, Circle, Group} from '@shopify/react-native-skia';
import {Flex} from 'react-native-flex-layout';

const RNSkia = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <Flex center fill>
      <Canvas style={{width, height, backgroundColor: 'red'}}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </Flex>
  );
};

export default RNSkia;
