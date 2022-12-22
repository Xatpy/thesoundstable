import styles from "./Button.module.css";

import { useGlobalContext } from "src/hooks/useGlobalContext";

import { getIdFromUrl } from "src/logic/utils";

import cx from "classnames";

type ButtonProps = {
  id: string;
  text: string;
  urlSound: string;
  tag?: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  id,
  urlSound,
  tag = "",
}) => {
  const { hashAudiosHowl } = useGlobalContext();

  const onClick = (evt: any) => {
    evt.preventDefault();
    var target = evt.target || evt.srcElement; // Fix for Firefox
    hashAudiosHowl[target.id].play();
  };

  return (
    <div className={styles.divButton}>
      {tag && (
        <span
          className={cx(styles.tag, {
            [styles.tagNew]: tag === "New",
          })}
        >
          {tag}
        </span>
      )}
      <a
        href={urlSound}
        className={styles.button}
        id={getIdFromUrl(urlSound)}
        onClick={onClick}
      >
        {text}
      </a>
    </div>
  );
};
