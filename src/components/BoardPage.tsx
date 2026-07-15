import React, { useEffect, useState } from "react";
import App from "../App";
import { Board } from "../types";

const boardLoaders = {
  apm: () => import("../data/apm.json"),
  auronPlay: () => import("../data/auronPlay.json"),
  bisbal: () => import("../data/bisbal.json"),
  djMariio: () => import("../data/djMariio.json"),
  elChiringuito: () => import("../data/elChiringuito.json"),
  elXokas: () => import("../data/elXokas.json"),
  ibai: () => import("../data/ibai.json"),
  illoJuan: () => import("../data/illoJuan.json"),
  knekro: () => import("../data/knekro.json"),
  laVidaModerna: () => import("../data/laVidaModerna.json"),
  llados: () => import("../data/llados.json"),
  luisEnrique: () => import("../data/luisEnrique.json"),
  maldini: () => import("../data/maldini.json"),
  rajoy: () => import("../data/rajoy.json"),
  rubius: () => import("../data/rubius.json"),
};

export type BoardKey = keyof typeof boardLoaders;

type Props = {
  board: BoardKey;
};

export const BoardPage: React.FC<Props> = ({ board }) => {
  const [data, setData] = useState<Board | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setHasError(false);

    boardLoaders[board]()
      .then(({ default: loadedBoard }) => {
        if (active) setData(loadedBoard as Board);
      })
      .catch(() => {
        if (active) setHasError(true);
      });

    return () => {
      active = false;
    };
  }, [board]);

  if (hasError) {
    return <p role="alert">No se han podido cargar los sonidos. Inténtalo de nuevo.</p>;
  }

  if (!data) {
    return <p role="status">Cargando sonidos…</p>;
  }

  return <App data={data} />;
};
