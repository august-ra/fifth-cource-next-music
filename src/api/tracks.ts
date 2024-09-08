import { TokenState } from "@/store/features/userSlice"
import { ErrorMessage, PlaylistType } from "@/types"


export const TracksAPI = {
  uri: "https://webdev-music-003b5b991590.herokuapp.com",

  async getTracks(): Promise<PlaylistType | ErrorMessage> {
    let status = 0
    const endpoint = `${TracksAPI.uri}/catalog/track/all/`

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

  async getFavouriteTracks(tokens: TokenState) {
    const endpoint = `${TracksAPI.uri}/catalog/track/favorite/all/`

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data.data
  },

  async changeLikeTrack(trackId: number, isLiked: boolean, access: string): Promise<any> {
    const endpoint = `${this.uri}/catalog/track/${trackId}/favorite/`

    const response = await fetch(endpoint, {
      method: isLiked ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })

    const data = await response.json()

    if (!response.ok)
      throw new Error(data.detail)

    return data.data
  },
}
