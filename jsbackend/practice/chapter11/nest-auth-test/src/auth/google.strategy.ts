import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id, name, emails } = profile;
        console.log(accessToken);
        console.log(refreshToken);

        const providerId = id;
        const email = emails[0].value;

        // 유저 서비스에서 이메일로 유저를 찾거나 새로 생성
        const user: User = await this.userService.findByEmailOrSave(
            email,
            name.familyName + name.givenName,
            providerId,
        );

        return user;

        console.log(providerId, email.replace, name.familyName, name.givenName);
        return profile;
    }
}