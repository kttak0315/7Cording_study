import { Body, Controller, Get, Post, Param, Put, Delete, NotFoundException, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) // 응답 객체 직렬화 시 User 엔티티의 @Exclude 적용
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get(':email')
    async getUser(@Param('email') email: string): Promise<User> {
        const user = await this.userService.getUser(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    @Put('/update/:email')
    async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(email, updateUserDto);
    }

    @Delete(':email')
    @HttpCode(HttpStatus.NO_CONTENT) // 성공 시 204 No Content 반환
    async deleteUser(@Param('email') email: string): Promise<void> {
        const result = await this.userService.deleteUser(email);
        if (result.affected === 0) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
    }
}