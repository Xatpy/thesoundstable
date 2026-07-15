import { createContext, useContext } from "react";
export type GlobalContent = {
  title: string;
};

export const MyGlobalContext = createContext<GlobalContent>({
  title: "The Sounds Table",
});
export const useGlobalContext = () => useContext(MyGlobalContext);
