export interface IUser extends Express.User{
    username: string,
    password: string,
    displayName: string
}