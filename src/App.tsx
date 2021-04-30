import React, { lazy, Suspense } from "react";
import { Spinner } from "evergreen-ui";
const Questions = lazy(() => import("./Questions"));

function App(): JSX.Element {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div>
            <Spinner marginX="auto" marginY={120} size={132} />
          </div>
        }
      >
        <Questions />
      </Suspense>
    </div>
  );
}

export default App;
