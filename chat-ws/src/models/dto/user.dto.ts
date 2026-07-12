export class SimpleProfile {
  public id = ''
  public name = ''
  public email = ''
  public photo?: string | null | undefined
  public isPublic = true

  constructor(id: string, name: string, email: string, photo: string | null, isPublic: boolean) {
    this.id = id
    this.name = name
    this.email = email
    this.photo = photo
    this.isPublic = isPublic
  }
}

export type SimpleUser = Pick<SimpleProfile, 'id' | 'name' | 'email'>
