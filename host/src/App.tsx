import React from "react";
const RemoteButton = React.lazy(() => import("remote/Button"));

const App = () => (
  <React.Suspense fallback="Loading...">
    <h1>Host App</h1>
    <RemoteButton />
  </React.Suspense>
);

export default App;