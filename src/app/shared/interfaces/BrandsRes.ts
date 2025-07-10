export interface BrandsRes {
  results: number
  metadata: Metadata
  data: Daum[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Daum {
id: any
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
