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
export type BoardLoader = (board: BoardKey) => Promise<Board>;

const loadBoard: BoardLoader = (board) =>
  boardLoaders[board]().then(({ default: loadedBoard }) => loadedBoard as Board);

type Props = {
  board: BoardKey;
  loadBoard?: BoardLoader;
};

export const BoardPage: React.FC<Props> = ({ board, loadBoard: boardLoader = loadBoard }) => {
  const [data, setData] = useState<Board | null>(null);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setData(null);
    setHasError(false);

    boardLoader(board)
      .then((loadedBoard) => {
        if (active) setData(loadedBoard);
      })
      .catch(() => {
        if (active) setHasError(true);
      });

    return () => {
      active = false;
    };
  }, [attempt, board, boardLoader]);

  if (hasError) {
    return (
      <div role="alert">
        <p>No se han podido cargar los sonidos.</p>
        <button type="button" onClick={() => setAttempt((value) => value + 1)}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return <p role="status">Cargando sonidos…</p>;
  }

  return <App data={data} />;
};
