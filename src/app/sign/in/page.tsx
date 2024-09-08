"use client"

import styles from "../Signing.module.css"
import cn from "classnames"

import { MouseEvent } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const router = useRouter()

  function handleRedirectToSigningUp(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    router.push('./up')
  }

  return (
    <>
      <input className={cn(styles.modalInput, styles.gaped)} type="text" name="email" placeholder="Почта" autoFocus={true} />
      <input className={styles.modalInput} type="password" name="password" placeholder="Пароль" />
      <button className={cn(styles.modalEnter, styles.gaped)} onClick={() => {}}>Войти</button>
      <button className={styles.modalAdditional} onClick={handleRedirectToSigningUp}>Зарегистрироваться</button>
    </>
  )
}
