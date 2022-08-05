import { v4 as uuidv4 } from 'uuid';

export interface TransformedTagsInterface {
   id: ReturnType<typeof uuidv4>,
   title: string
}

export const getTransformTags = (tags: string[]): TransformedTagsInterface[] => {
   if(!tags.length) return []
   return tags.map(tag => ({id: uuidv4(), title: tag}))
}