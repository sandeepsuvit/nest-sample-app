import { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // method
    comparePassword(password: string): boolean;
}
