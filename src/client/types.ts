export interface ICurrentUser {
  username?: string
  loggedIn: boolean
}

export interface IUserState {
  members: string[],
  currentUser: ICurrentUser
}
