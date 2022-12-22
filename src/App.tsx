import React from "react";
import { useState } from "react";

// import "./App.css";

import { MyGlobalContext } from "./hooks/useGlobalContext";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
// import { Button } from "./components/Button";

import { SharePanel } from "src/components/Share/SharePanel";

type AppProps = {
  data: any;
};

const App: React.FC<AppProps> = ({ data }) => {
  const [title, setTitle] = useState<string>(data.title ?? "The Sounds Table");
  const [hashAudiosHowl, setHashAudiosHowl] = useState<any>({});

  document.title = `🎶 ${title} Sounds`;

  return (
    <MyGlobalContext.Provider
      value={{
        title,
        setTitle,
        hashAudiosHowl,
        setHashAudiosHowl,
      }}
    >
      <Header />
      <SharePanel />
      <Main data={data} />
    </MyGlobalContext.Provider>

    /* <Button
        id="foo"
        text="text"
        urlSound="https://raw.githubusercontent.com/Xatpy/SoundsTable/master/ElXokas/callate.mp3"
      /> */
  );
};

export default App;
