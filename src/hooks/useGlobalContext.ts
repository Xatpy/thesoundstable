import { createContext, useContext } from "react";
export type GlobalContent = {
  title: string;
  setTitle: (s: string) => void;
  hashAudiosHowl: any;
  setHashAudiosHowl: (x: any) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  title: "The Sounds Table",
  setTitle: () => {},
  hashAudiosHowl: {},
  setHashAudiosHowl: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
