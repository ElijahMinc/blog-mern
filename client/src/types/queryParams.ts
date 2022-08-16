import { TabValue } from "@/redux"


export interface QueryParams {
  id?: string
  limit?: number
  typeTab?: TabValue,
  page?: number,
  searchValue?: string,
  tags?: string[]
 }
 