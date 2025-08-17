/* eslint-disable @typescript-eslint/no-explicit-any */


export interface MovieHomeResponse {
  data: {
    seoOnPage: {
      titleHead: string
      descriptionHead: string
      og_type: string
      og_image: string[]
      [key: string]: any
    }
    items: {
      name: string
      slug: string
      thumb_url: string
      [key: string]: any
    }[]
    [key: string]: any
  }
}