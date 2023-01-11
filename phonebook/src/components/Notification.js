import styles from "./error.module.css";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return <div className={`${styles.message} ${styles[type]}`}>{message}</div>;
};

export default Notification;
