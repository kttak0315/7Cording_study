import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private readonly saltRounds = 10; // bcrypt 해싱 강도

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
    
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, username, password } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists.`);
        }

        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        const newUser = this.userRepository.create({
            email,
            username,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    async getUser(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return user;
    }

    async updateUser(email: string, updateData: UpdateUserDto): Promise<User> {
        const user = await this.getUser(email); // user의 타입은 User | null 입니다.
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, this.saltRounds);
        }

        // 제공된 필드만 업데이트합니다.
        Object.assign(user, updateData);
        return this.userRepository.save(user);
    }

    async deleteUser(email: string): Promise<DeleteResult> {
        return this.userRepository.delete({ email });
    }
}
