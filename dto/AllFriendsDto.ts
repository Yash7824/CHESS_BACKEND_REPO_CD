import User, { IUser } from "../models/User";

export interface AllFriendsDto{
    success: boolean
    friends: IUser[]
}