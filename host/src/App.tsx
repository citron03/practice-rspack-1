import React, { useRef, useEffect } from "react";
import { useStore } from 'zustand';
import { store } from 'remote/store'; // ✅ 반드시 remote에서만 import 해야 shared store를 사용합니다.

const RemoteButton = React.lazy(() => import("remote/Button"));
const RemoteCounter = React.lazy(() => import("remote/Counter"));

const VanillaApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      import('vanilla_remote/App').then(({ mount }) => {
        mount(ref.current);
      });
    }
  }, []);

  return <div ref={ref} />;
};

const App = () => {
  const count = useStore(store, (s) => s.count);

  return (
  <React.Suspense fallback="Loading...">
    <h1>🏠 Host App</h1>
    <RemoteButton />
    <div>
      <p>Shared Count: {count}</p>
      <RemoteCounter />
    </div>
    <VanillaApp />
  </React.Suspense>
)};

export default App;