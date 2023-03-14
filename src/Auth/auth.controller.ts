import { Body, Controller,Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { userInfo } from 'os';
import { UserLoginValidation, UserValidation } from 'src/Validation/user';
import {AuthService} from './auth.service';
import { Status } from './decorators/role.decorator';
import { RoleEnum } from './enum/role.enum';
import { JwtGuard } from './guard/jwt.guard';
import { RolesGuard } from './guard/role.guard';


@Controller('api/auth')
export class AuthController {
    constructor(private readonly authProvider: AuthService){
        
    }

    @Post("login/")
    @UseInterceptors(FileInterceptor('profile'))
    login(@Body() userInfo:UserLoginValidation) {
        return this.authProvider.Login(userInfo)
    }

    // @Status(RoleEnum.Admin)
    // @UseGuards(JwtGuard,RolesGuard)
    @Post("register")
    @UseInterceptors(FileInterceptor('profile'))
    register(@UploadedFile() file:any,@Body() userInfo:UserValidation){
        return this.authProvider.register(file,userInfo)
    }
    

}
