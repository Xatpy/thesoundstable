import React from "react";
import { useEffect, useState } from "react";

import { Howl } from "howler";

import { Button } from "src/components/Button";
import { getIdFromUrl, verifySound } from "src/logic/utils";
import { useGlobalContext } from "src/hooks/useGlobalContext";

import styles from "./Main.module.css";

type Props = {
  data: any;
};

export const Main: React.FC<Props> = ({ data }) => {
  const [children, setChildren] = useState<any>(null);

  const { hashAudiosHowl, setHashAudiosHowl } = useGlobalContext();

  useEffect(() => {
    const loadAudio = (urlSound: string): void => {
      const id = getIdFromUrl(urlSound);

      const audioHowl = new Howl({
        src: [urlSound],
      });

      hashAudiosHowl[id] = audioHowl;
      setHashAudiosHowl(hashAudiosHowl);
    };

    const getChildrenButtons = (data: any) => {
      if (!data) {
        return;
      }

      let sounds = data.sounds;
      if (sounds !== undefined) {
        let childrenButtons = [];
        for (let i = 0; i < data.sounds.length; ++i) {
          if (verifySound(data.sounds[i])) {
            /*let innerDiv = document.createElement("div");
              if (data.sounds[i].tag) {
                let span = document.createElement("span");
                span.classList.add("tag");
                if (data.sounds[i].tag === "New") {
                  span.classList.add("tagNew");
                }
                span.innerHTML = data.sounds[i].tag;
                innerDiv.appendChild(span);
              }*/

            const urlSound = data.sounds[i].soundURL;

            loadAudio(urlSound);

            childrenButtons.push(
              <Button
                key={`button-${i}`}
                text={data.sounds[i].text}
                urlSound={urlSound}
                id={i.toString()}
                tag={data.sounds[i].tag ?? ""}
              />
            );
          }
        }
        setChildren(childrenButtons);
      }
    };

    getChildrenButtons(data);
  }, [data, hashAudiosHowl, setHashAudiosHowl]);

  return (
    <div id="main" className={styles.main}>
      <div id="content" className={styles.content}>
        {children}
      </div>
    </div>
  );
};
