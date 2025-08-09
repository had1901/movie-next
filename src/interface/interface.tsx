

export interface MovieHomeResponse {
  data: {
    seoOnPage: {
      titleHead: string
      descriptionHead: string
      og_type: string
      og_image: string[]
      [key: string]: unknown
    }
    items: {
      name: string
      slug: string
      thumb_url: string
      [key: string]: string
    }[]
    [key: string]: unknown
  }
}