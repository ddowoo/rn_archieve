import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import {type Item, useStore} from './zustand';

type ItemProps = {
  index: number;
};

const Item = ({index}: ItemProps) => {
  const {itemList, changeItemStatus} = useStore();

  const item = itemList[index];

  const onPressItem = (index: number) => changeItemStatus(index);

  return (
    <TouchableOpacity onPress={() => onPressItem(index)} testID={item.id}>
      <Flex direction="row" justify="between" mv={4}>
        <Text>{item.name}</Text>
        <Text>{item.isActive ? '✅' : '❌'}</Text>
      </Flex>
    </TouchableOpacity>
  );
};

const DefaultItemList = () => {
  const {itemList} = useStore();

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatlist}
        data={itemList}
        keyExtractor={({id}) => id}
        renderItem={({index}) => {
          return <Item index={index} />;
        }}
      />
    </SafeAreaView>
  );
};

export default DefaultItemList;

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 20,
  },
});
