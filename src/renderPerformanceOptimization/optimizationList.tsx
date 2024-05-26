import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {type Item, useStore} from './zustand';
import {Flex} from 'react-native-flex-layout';
import React, {useCallback} from 'react';

type Props = {
  onPressItem: (index: number) => void;
  item: Item;
  index: number;
};

const Item = React.memo(({onPressItem, item, index}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPressItem(index)} testID={item.id}>
      <Flex direction="row" justify="between" mv={4}>
        <Text>{item.name}</Text>
        <Text>{item.isActive ? '✅' : '❌'}</Text>
      </Flex>
    </TouchableOpacity>
  );
});

const OptimizationList = () => {
  const {itemList, changeItemStatus} = useStore();

  const renderItem = useCallback(
    ({item, index}: {item: Item; index: number}) => (
      <Item item={item} index={index} onPressItem={changeItemStatus} />
    ),
    [changeItemStatus],
  );

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatlist}
        data={itemList}
        keyExtractor={({id}) => id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default OptimizationList;

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 20,
  },
});
