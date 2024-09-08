import { CreatedUserFormData, UserFormData } from "@/types"


export const UserAPI = {
  uri: "https://webdev-music-003b5b991590.herokuapp.com",

  async signIn(userData: UserFormData) {
    const response = await fetch(`${UserAPI.uri}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data
  },

  async signUp(userData: CreatedUserFormData) {
    const response = await fetch(`${UserAPI.uri}/user/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data
  },

  async getTokens(userData: UserFormData) {
    const response = await fetch(`${UserAPI.uri}/user/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data
  },

  async refreshTokens(token: string) {
    const response = await fetch(`${UserAPI.uri}/user/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh: token }),
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data
  },
}
