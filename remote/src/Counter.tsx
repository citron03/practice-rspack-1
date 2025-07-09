import React from 'react';
import { useStore } from 'zustand';
import { store } from 'shared/store';

export default function Counter() {
  const count = useStore(store, (state) => state.count);
  const increase = useStore(store, (state) => state.increase);
  const decrease = useStore(store, (state) => state.decrease);

  return (  
    <div style={{ border: '1px solid blue', padding: 10 }}>
      <h3>📦 Remote Counter</h3>
      <p>Count: {count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
