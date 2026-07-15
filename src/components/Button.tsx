import styles from "./Button.module.css";

import cx from "classnames";

type ButtonProps = {
  text: string;
  tag?: string;
  onPlay: () => void;
  hasError?: boolean;
  onRetry?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  tag = "",
  onPlay,
  hasError = false,
  onRetry,
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
      {hasError && onRetry && (
        <div className={styles.error} role="alert">
          <span>No se ha podido cargar el audio.</span>
          <button type="button" className={styles.retry} onClick={onRetry}>
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
};
