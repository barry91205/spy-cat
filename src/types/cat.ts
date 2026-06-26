export interface Cat {
  id: number
  name: string
  breed: string
  status: 'lost' | 'found' | 'looking'
  statusLabel: string
  image: string
  desc: string
  location: string
  date: string
  contact: string
  comments: number
  fav: boolean
}

export interface Comment {
  id: number
  avatar: string
  name: string
  text: string
  time: string
}