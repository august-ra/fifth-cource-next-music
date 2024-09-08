import React from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { dislikeTrack, likeTrack } from "@/store/features/playlistSlice"
import { TracksAPI } from "@/api/tracks"
import { TrackType } from "@/types"


interface HookResult {
  isLiked: boolean
  onLike:  React.MouseEventHandler<HTMLDivElement>
}

export function useLikeButton(currentTrack: TrackType): HookResult {
  const dispatch        = useAppDispatch()
  const tokens          = useAppSelector((state) => state.user.tokens)
  const favouriteTracks = useAppSelector((state) => state.playlist.favouriteTracks)

  const isLiked: boolean = Boolean(favouriteTracks.find((track) => track._id === currentTrack._id))

  const handleLike = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (!tokens.access || !tokens.refresh)
      return

    try {
      await TracksAPI.changeLikeTrack(currentTrack._id, !isLiked, tokens.access, tokens.refresh)

      if (isLiked)
        dispatch(dislikeTrack(currentTrack))
      else
        dispatch(likeTrack(currentTrack))
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return { isLiked, onLike: handleLike }
}
