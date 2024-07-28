
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

export interface ErrorMessage {
  status:   number
  message:  string
  endpoint: string
}

export function isError(pet: ErrorMessage | any): pet is ErrorMessage {
  return (<ErrorMessage>pet).message !== undefined;
}

/* enums */

export enum FilterKind {
  artist = "исполнителю",
  genre  = "жанру",
  year   = "году выпуска",
}
