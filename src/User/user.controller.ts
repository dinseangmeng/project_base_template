import { Controller,Get,Req,UseGuards ,Delete, Param,Put,Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import {AuthGuard} from '@nestjs/passport'
import { Request } from 'express';
import { JwtGuard } from '../Auth/guard/jwt.guard';
import {  passwordChangeValidation, UserUpdateValidation } from 'src/Validation';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/user')
export class UserController {
    constructor(private readonly UserService: UserService){}
    
    @UseGuards(JwtGuard)
    @Get('/my-profile')
    getProfile(@Req() reg : Request){
        return {msg:reg.user}
    }


   

    @UseGuards(JwtGuard)
    @Put('/edit')
    @UseInterceptors(FileInterceptor('profile'))
    EditProfile(@UploadedFile() file:any,@Body() userInfo:UserUpdateValidation,@Req() reg : Request){
        
        return this.UserService.EditProfile(file,reg.user,userInfo);
    }

    @Put('/changePassword')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('profile'))
    ChangePassword(@Body() data:passwordChangeValidation,@Req() reg : Request){
        // console.log(data);
        
        return this.UserService.ChangePassword(data,reg.user)
    }
   

}
