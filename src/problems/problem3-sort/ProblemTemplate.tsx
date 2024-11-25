import { useState, useEffect } from "react";
import Template from "@src/common/template/Template";
import MobileTemplate from "@src/common/template/MobileTemplate";
import { observer } from "mobx-react";
import { useProblemStore } from "./store/ProblemStoreProvider";
import ProblemDesc from "./components/ProblemDesc";
import SortBar from "./components/SortBar";
import Controller from "./components/Controller";

function ProblemTemplate() {
  const [nowWidth, setNowWidth] = useState(window.innerWidth);
  useEffect(() => {
    addEventListener("resize", () => {
      setNowWidth(window.innerWidth);
    });
  }, []);

  const problemStore = useProblemStore();

  const onStart = async () => {
    await problemStore.runSort();
    return true;
  };
  const onStop = () => {
    problemStore.running = false;
  };
  const onRefresh = () => {
    problemStore.reset();
  };

  return (
    <>
      {nowWidth > 900 ? (
        <Template
          problem={<ProblemDesc />}
          selector={<Controller />}
          viewer={<SortBar />}
          onStart={onStart}
          onStop={onStop}
          onRefresh={onRefresh}
        />
      ) : (
        <MobileTemplate
          problem={<ProblemDesc />}
          selector={<Controller />}
          viewer={<SortBar />}
          onStart={onStart}
          onStop={onStop}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
}

export default observer(ProblemTemplate);
