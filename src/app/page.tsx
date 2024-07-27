import Bar from "@components/Bar/Bar"
import Main from "@components/Main/Main"

import { API } from "@/api/tracks"
import { TrackType } from "@/types"


export default async function Home() {
  let trackList: TrackType[] = []
  let errorMsg: string = ""

  try {
    trackList = await API.getTracks()
  } catch (error: unknown) {
    if (error instanceof Error)
      errorMsg = error.message
    else
      errorMsg = "Неизвестная ошибка"
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Main trackList={trackList} errorMsg={errorMsg} />
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  )
}
