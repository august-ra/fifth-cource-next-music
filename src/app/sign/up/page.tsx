"use client"

import styles from "../Signing.module.css"
import cn from "classnames"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { getTokens, publicError, signUp } from "@/store/features/userSlice"
import { UserAPI } from "@/api/users"
import { CreatedUserFormData, isError } from "@/types"


export default function LoginPage() {
  const router = useRouter()
  const errorMsg = useAppSelector((state) => state.user.errorMsg)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<CreatedUserFormData>({
    email:    "",
    password: "",
    username: "",
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

    await dispatch(signUp(formData))
    await dispatch(getTokens(formData))

    if (!UserAPI.error.message)
      router.push('/')

    dispatch(publicError(UserAPI.error))
  }

  return (
    <>
      <input className={cn(styles.modalInput, styles.gaped)} type="email" name="email" placeholder="Электронная почта" autoFocus={true}
             value={formData.email} onChange={handleChangeFormData} />
      <input className={cn(styles.modalInput, styles.gaped)} type="password" name="password" placeholder="Пароль"
             value={formData.password} onChange={handleChangeFormData} />
      <input className={styles.modalInput} type="text" name="username" placeholder="Имя пользоателя"
             value={formData.username} onChange={handleChangeFormData} />

      {
        isError(errorMsg)
          && (
            <div className={styles.errorBlock}>
              {errorMsg.message}
            </div>
          )
      }

      <button className={cn(styles.modalEnter, styles.gaped)} onClick={handleSubmit}>Зарегистрироваться</button>
    </>
  )
}
