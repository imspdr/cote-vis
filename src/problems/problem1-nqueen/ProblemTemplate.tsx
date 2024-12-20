import { useState, useEffect } from "react";
import Template from "@src/common/template/Template";
import MobileTemplate from "@src/common/template/MobileTemplate";
import ChessBoard from "./components/ChessBoard";
import Controller from "./components/Controller";
import ProblemDesc from "./components/ProblemDesc";
import { observer } from "mobx-react";
import { useProblemStore } from "./store/ProblemStoreProvider";

function ProblemTemplate() {
  const [nowWidth, setNowWidth] = useState(window.innerWidth);
  const resize = () => {
    setNowWidth(window.innerWidth);
  };
  useEffect(() => {
    addEventListener("resize", resize);
    return () => {
      removeEventListener("resize", resize);
    };
  }, []);

  const problemStore = useProblemStore();

  const start = problemStore.solving;
  const onStart = async () => {
    const ret = await problemStore.onClickSolver();
    return ret;
  };
  const onStop = () => {
    problemStore.onClickStop();
  };
  const onRefresh = () => {
    problemStore.clear();
  };

  const problem = <ProblemDesc />;
  const controller = <Controller />;
  const viewer = <ChessBoard />;

  return (
    <>
      {nowWidth > 900 ? (
        <Template
          problem={problem}
          controller={controller}
          viewer={viewer}
          start={start}
          onStart={onStart}
          onStop={onStop}
          onRefresh={onRefresh}
        />
      ) : (
        <MobileTemplate
          problem={problem}
          controller={controller}
          viewer={viewer}
          start={start}
          onStart={onStart}
          onStop={onStop}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
}

export default observer(ProblemTemplate);
