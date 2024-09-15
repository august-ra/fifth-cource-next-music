import { UserAPI } from "@/api/users"
import { PlaylistType } from "@/types/tracksTypes"
import { TokensPair } from "@/types/usersTypes"
import { ErrorMessage, getEmptyError } from "@/types/errorsTypes"


export const TracksAPI = {
  uri:   "https://webdev-music-003b5b991590.herokuapp.com",
  error: getEmptyError(),


  async requestToEndPoint(endpoint: string, refresh: string | null, params: RequestInit) {
    let response = await fetch(endpoint, params)

    if (refresh && response.status === 401) {
      const token = await UserAPI.refreshTokens(refresh)

      params.headers = {
        ...params.headers,
        Authorization: `Bearer ${token}`,
      }

      response = await fetch(endpoint, params)
    }

    const data = await response.json()

    if (!response.ok) {
      TracksAPI.error.endpoint = endpoint
      TracksAPI.error.status   = response.status
      TracksAPI.error.message  = data.message

      throw new Error(data.message)
    }

    TracksAPI.error = getEmptyError()

    return data.data
  },


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
        return { status, endpoint, message: error.message }
      else
        throw new Error("Неизвестная ошибка")
    }
  },


  async getFavouriteTracks(tokens: TokensPair) {
    const endpoint = `${TracksAPI.uri}/catalog/track/favorite/all/`

    return TracksAPI.requestToEndPoint(endpoint, tokens.refresh, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })
  },

  async changeLikeTrack(trackId: number, isLiked: boolean, tokens: TokensPair) {
    const endpoint = `${this.uri}/catalog/track/${trackId}/favorite/`

    return TracksAPI.requestToEndPoint(endpoint, tokens.refresh, {
      method: isLiked ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })
  },
}
