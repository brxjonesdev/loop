

export interface UserModel{
  id: string
  name: string
  profileImage: string
  createdAt: Date
  updatedAt: Date
}

export interface UserCreate {
    name: string
    profileImage: string

}

export interface UserUpdate {
    id: string
    name?: string
    profileImage?: string
}


