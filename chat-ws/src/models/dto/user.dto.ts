export class SimpleProfile {
  public id = ''
  public name = ''
  public photo?: string | null
  public isPublic = true

  constructor(id: string, name: string, photo: string | null, isPublic: boolean) {
    this.id = id
    this.name = name
    this.photo = photo
    this.isPublic = isPublic
  }
}

export type SimpleUser = Pick<SimpleProfile, 'id' | 'name'>
