
/* interfaces */

export interface UserType {
  _id:        number
  username:   string
  first_name: string
  last_name:  string
  email:      string
}

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

/* enums */

export enum FilterKind {
  artist = "исполнителю",
  genre  = "жанру",
  year   = "году выпуска",
}
