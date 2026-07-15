import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Howl } from "howler";

import { Button } from "src/components/Button";
import { getIdFromUrl, verifySound } from "src/logic/utils";
import { Board } from "src/types";

import styles from "./Main.module.css";

type AudioPlayer = {
  play: () => void;
  unload: () => void;
};

type Props = {
  data: Board;
  createAudio?: (urlSound: string) => AudioPlayer;
};

export const Main: React.FC<Props> = ({
  data,
  createAudio = (urlSound) => new Howl({ src: [urlSound] }),
}) => {
  const [filterText, setFilterText] = useState<string>("");
  const audioById = useRef<Map<string, AudioPlayer>>(new Map());

  useEffect(() => {
    const audios = audioById.current;
    return () => {
      audios.forEach((audio) => audio.unload());
      audios.clear();
    };
  }, [data]);

  const sounds = useMemo(
    () => data.sounds.filter(verifySound),
    [data.sounds]
  );

  const playSound = useCallback((urlSound: string) => {
    const id = getIdFromUrl(urlSound);
    let audio = audioById.current.get(id);

    if (!audio) {
      audio = createAudio(urlSound);
      audioById.current.set(id, audio);
    }

    audio.play();
  }, [createAudio]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const normalizedFilter = filterText.trim().toLocaleLowerCase();
  const filteredSounds = sounds.filter((sound) =>
    sound.text.toLocaleLowerCase().includes(normalizedFilter)
  );

  return (
    <div id="main" className={styles.main}>
      <div className={styles.filters}>
        <input
          onChange={onChange}
          className={styles.inputFilter}
          placeholder="Filtro por texto"
          aria-label="Filtrar sonidos por texto"
        />
        <span className={styles.inputMagnifier}>🔍</span>
      </div>
      <div id="content" className={styles.content}>
        {filteredSounds.length > 0 ? (
          filteredSounds.map((sound) => (
            <Button
              key={sound.soundURL}
              text={sound.text}
              tag={sound.tag}
              onPlay={() => playSound(sound.soundURL)}
            />
          ))
        ) : (
          <span>Búsqueda sin resultado</span>
        )}
      </div>
    </div>
  );
};
