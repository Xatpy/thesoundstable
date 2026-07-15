import styles from "./Button.module.css";

import cx from "classnames";

type ButtonProps = {
  text: string;
  tag?: string;
  onPlay: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  tag = "",
  onPlay,
}) => {
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
      <button
        type="button"
        className={styles.button}
        onClick={onPlay}
        aria-label={`Reproducir ${text}`}
      >
        {text}
      </button>
    </div>
  );
};
