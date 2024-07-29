import Bar from "@components/Bar/Bar"
import Main from "@components/Main/Main"

import CurrentTrackProvider from "@contexts/CurrentTrackProvider"

import { API } from "@/api/tracks"
import { ErrorMessage, isError, TrackType } from "@/types"


export default async function Home() {
  let trackList: TrackType[] = []
  let errorMsg:  ErrorMessage | null

  try {
    const data = await API.getTracks()

    if (isError(data))
      errorMsg = data as ErrorMessage
    else
      [trackList, errorMsg] = [data, null]
  } catch (error: unknown) {
    if (error instanceof Error)
      errorMsg = { status: 0, endpoint: "", message: error.message }
    else
      errorMsg = { status: 0, endpoint: "", message: "Неизвестная ошибка" }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <CurrentTrackProvider>
          <Main trackList={trackList} errorMsg={errorMsg} />
          <Bar />
        </CurrentTrackProvider>

        <footer className="footer" />
      </div>
    </div>
  )
}
