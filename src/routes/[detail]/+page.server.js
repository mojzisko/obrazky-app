import { error } from '@sveltejs/kit'
import data from './data'

export async function load({ params }) {
  const image = data[params.detail]
  console.log('params', params)

  if (image)
    return {
      header: {
        width: 'xl:w-4/6'
      },
      image
    }

  throw error(404)
}
