import { IUser } from './../core/interfaces/user.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find({});
    }

    async findOneByEmail(email: string, showPassword: boolean = false): Promise<IUser> {
        return await this.userModel.findOne({ email }).select(showPassword ? '+password' : '');
    }

    async save(user: CreateUserDto): Promise<IUser> {
        try {
            return await new this.userModel(user).save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
