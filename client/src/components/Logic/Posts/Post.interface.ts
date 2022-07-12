export interface FormDefaultValuesPost{
   title: string
   text: string
   tags: string[]

   image?: File | string | null
}


export const defaultValuesPost: FormDefaultValuesPost ={
   title: 'Your perfect title',
   text: '<h1>Your perfect message😃</h1>',
   tags: [],
   
   image: null,
}