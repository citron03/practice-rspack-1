import React from "react";
import { useStore } from 'zustand';
import { store } from 'remote/store'; // ✅ 반드시 remote에서만 import 해야 shared store를 사용합니다.

const RemoteButton = React.lazy(() => import("remote/Button"));
const RemoteCounter = React.lazy(() => import("remote/Counter"));

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
  </React.Suspense>
)};

export default App;