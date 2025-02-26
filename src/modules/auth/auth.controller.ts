import { Controller, Body, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const result = await this.authService.login(req.user);
        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true, // Prevent access from JavaScript
                secure: process.env.NODE_ENV === "production", // Use secure flag in production
                sameSite: "lax", // Prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000, // Expire in 7 days
                path: '/'
            });
        }
        return res.send(result);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: SignupDto) {
        return await this.authService.create(user);
    }
}