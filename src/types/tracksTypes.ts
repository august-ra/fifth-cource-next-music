import { UserType } from "@/types/usersTypes"


/* interfaces */

export interface TrackType {
  _id:                 number
  name:                string
  author:              string
  release_date:        string
  genre:               string[]
  duration_in_seconds: number
  album:               string
  // logo:                string | null
  logo: {
    type:              string
    data:              unknown[]
  }
  track_file:          string
  staredUser:          UserType[]
}

export interface CatalogType {
  _id:   number
  name:  string
  items: number[]
  owner: number[]
  __v:   number
}

export interface CatalogImageDetails {
  path: string
  alt:  string
}

export interface CatalogsImagesDetails {
  "Плейлист дня":      CatalogImageDetails
  "Танцевальные хиты": CatalogImageDetails
  "Инди-заряд":        CatalogImageDetails
}

/* types */

export type PlaylistType = TrackType[]

export type CatalogsType = CatalogType[]

export type CatalogsOptions = keyof CatalogsImagesDetails

/* enumerations */

export enum FilterKind {
  artist = "исполнителю",
  genre  = "жанру",
  year   = "году выпуска",
}
