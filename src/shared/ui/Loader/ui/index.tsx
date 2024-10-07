import classes from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <div className={classes.Blob}></div>
        <div className={classes.Blob}></div>
      </div>
    </div>
  );
};
