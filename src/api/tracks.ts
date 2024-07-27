
export const API = {
  uri: "https://webdev-music-003b5b991590.herokuapp.com",

  async getTracks(): Promise<any> {
    try {
      const response = await fetch(`${this.uri}/catalog/track/all/`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      return data.data
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new Error(error.message)
      else
        throw new Error("Неизвестная ошибка")
    }
  },
}
