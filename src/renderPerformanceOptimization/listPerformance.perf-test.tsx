import React from 'react';
import {test} from '@jest/globals';
import {fireEvent, screen} from '@testing-library/react-native';
import {measureRenders} from 'reassure';
import OptimizationList from './optimizationList';
import DefaultItemList from './defaultList';

test('Flatlist 렌더링 최적화 전,후 비교', async () => {
  // 비교할 시나리오 작성
  const scenario = async () => {
    const button = screen.getByTestId('item-1');
    // 버튼 누르기
    fireEvent.press(button);
  };

  // 기본 리스트 , 0 버전 대에서는 measurePerformance 사용
  await measureRenders(<DefaultItemList />, {scenario});
});
