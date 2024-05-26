import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export type Item = {
  id: string;
  name: string;
  isActive: boolean;
};

type Store = {
  itemList: Item[];
  setItemList: (newItemList: Item[]) => void;
  changeItemStatus: (index: number) => void;
};

const initilData = Array.from({length: 300}, (v, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  isActive: Math.random() > 0.5,
}));

export const useStore = create<Store>()(
  immer(set => ({
    itemList: initilData,
    setItemList: (newItemList: Item[]) => set({itemList: newItemList}),
    changeItemStatus: index =>
      set(prev => {
        prev.itemList[index].isActive = !prev.itemList[index].isActive;
      }),
  })),
);
