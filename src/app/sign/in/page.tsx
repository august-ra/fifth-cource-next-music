"use client"

import styles from "../Signing.module.css"
import cn from "classnames"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/store"
import { getTokens, signIn } from "@/store/features/userSlice"
import { UserFormData } from "@/types"


export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<UserFormData>({
    email:    "",
    password: "",
  })

  function handleChangeFormData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    try {
      await dispatch(signIn(formData))
      await dispatch(getTokens(formData))
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  function handleRedirectToSigningUp(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    router.push('./up')
  }

  return (
    <>
      <input className={cn(styles.modalInput, styles.gaped)} type="email" name="email" placeholder="Электронная почта" autoFocus={true}
             value={formData.email} onChange={handleChangeFormData} />
      <input className={styles.modalInput} type="password" name="password" placeholder="Пароль"
             value={formData.password} onChange={handleChangeFormData} />

      <button className={cn(styles.modalEnter, styles.gaped)} onClick={handleSubmit}>Войти</button>
      <button className={styles.modalAdditional} onClick={handleRedirectToSigningUp}>Зарегистрироваться</button>
    </>
  )
}
