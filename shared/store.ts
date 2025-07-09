import { createStore } from 'zustand/vanilla';

type Store = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// 싱글톤 store 인스턴스 생성
const store = createStore<Store>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export { store };
