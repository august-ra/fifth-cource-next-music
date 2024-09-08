import styles from "../Signing.module.css"
import cn from "classnames"


export default function LoginPage() {
  return (
    <>
      <input className={cn(styles.modalInput, styles.gaped)} type="text" name="email" placeholder="Почта" autoFocus={true} />
      <input className={cn(styles.modalInput, styles.gaped)} type="password" name="password" placeholder="Пароль" />
      <input className={styles.modalInput} type="password" name="password" placeholder="Повторите пароль" />
      <button className={cn(styles.modalEnter, styles.gaped)}>Зарегистрироваться</button>
    </>
  )
}
