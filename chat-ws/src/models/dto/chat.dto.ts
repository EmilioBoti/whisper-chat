export interface Chat {
  id: string,
  type: string,
  createdBy: string,
  createdAt: string
}

export interface UserChat {
  id: string,
  userId: string,
  role: string,
  joinedAt: string,
  menbers: any[]
}



// export interface Member {
  
// }