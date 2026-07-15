import React from "react";

// import "./App.css";

import { MyGlobalContext } from "./hooks/useGlobalContext";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
// import { Button } from "./components/Button";

import { SharePanel } from "src/components/Share/SharePanel";
import { Board } from "./types";

type AppProps = {
  data: Board;
};

const App: React.FC<AppProps> = ({ data }) => {
  const title = data.title || "The Sounds Table";

  document.title = `🎶 ${title} Sounds`;

  return (
    <MyGlobalContext.Provider value={{ title }}>
      <Header />
      <SharePanel />
      <Main data={data} />
    </MyGlobalContext.Provider>
  );
};

export default App;
