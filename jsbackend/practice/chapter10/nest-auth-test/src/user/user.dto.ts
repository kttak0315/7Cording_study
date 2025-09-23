import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty.' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;

    @IsNotEmpty({ message: 'Username cannot be empty.' })
    @IsString()
    username: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long if provided.' })
    password?: string;
}