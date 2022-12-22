import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  document.title = `[NF] - ${window.location.href}`;

  return (
    <section>
      <div className={styles.container}>
        <h1>Personaje no disponible (todavía 👀)</h1>
        <img
          src="https://media2.giphy.com/media/hEc4k5pN17GZq/giphy.gif?cid=ecf05e4703l3d57nxwnn0jats4k8dugo4ml5smztpzaros9b&rid=giphy.gif"
          alt="Character not found"
        ></img>
      </div>
    </section>
  );
};
