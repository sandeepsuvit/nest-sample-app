import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, required: true, trim: true, unique: true,
        lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true,
    },
    password: { type: String, required: true, select: false },
});

UserSchema.pre('save', function(next) {
    const self: any = this;

    // Check if the password if modified
    if (!self.isModified('password')) {
        return next();
    }

    // Hash the password synchronously, and use cycles as 10
    self.password = bcrypt.hashSync(self.password, 10);
    next();
});

// ========================================================================== //
//                          CUSTOM SCHEMA FUNCTIONS                           //
// ========================================================================== //

UserSchema.methods.comparePassword = function(password: string) {
    const self: any = this;
    return bcrypt.compareSync(password, self.password);
};
