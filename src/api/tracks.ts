import { ErrorMessage, PlaylistType } from "@/types"


export const API = {
  uri: "https://webdev-music-003b5b991590.herokuapp.com",

  async getTracks(): Promise<PlaylistType | ErrorMessage> {
    let status = 0
    const endpoint = `${this.uri}/catalog/track/all/`

    try {
      const response = await fetch(endpoint)

      status = response.status

      const data = await response.json()

      if (!response.ok)
        return { status, endpoint, message: data.message }

      return data.data
    } catch (error: unknown) {
      if (status >= 400)
        return { status, endpoint, message: "" }
      else if (error instanceof Error)
        return  { status, endpoint, message: error.message }
      else
        throw new Error("Неизвестная ошибка")
    }
  },
}
