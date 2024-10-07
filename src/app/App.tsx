import React, { Suspense } from "react";
import { Loader } from "shared";
import classes from "./App.module.scss";
import { TimeSegments } from "widgets";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className={classes.App}>
        <main className={classes.Wrapper}>
          <div className={classes.Container}>
            <TimeSegments />
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default App;
