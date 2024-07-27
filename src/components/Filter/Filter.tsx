import styles from "./Filter.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import classNames from "classnames"


export default function Filter() {
  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={classNames(styles.filterButton, shared.btnText)}>исполнителю</div>
      <div className={classNames(styles.filterButton, shared.btnText)}>году выпуска</div>
      <div className={classNames(styles.filterButton, shared.btnText)}>жанру</div>
    </div>
  )
}
