import { Controller,Get, UseGuards,Delete, Param,Req, Put, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { Status } from 'src/Auth/decorators/role.decorator';
import { RoleEnum } from 'src/Auth/enum/role.enum';
import { JwtGuard } from 'src/Auth/guard/jwt.guard';
import { RolesGuard } from '../../Auth/guard/role.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { passwordChangeValidation, UserUpdateValidation } from 'src/Validation';
@Controller('api/cp/user')
export class UserController {
    constructor(private readonly UserProvider:UserService){}

    @Status(RoleEnum.Admin)
    @UseGuards(JwtGuard,RolesGuard)
    @Get()
    listing(){
        return this.UserProvider.listing()
    }

    @Status(RoleEnum.Admin)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(':id')
    delete(@Param() id:number,@Req() req :Request){
        return this.UserProvider.Delete(id,req.user)
    }


    @Status(RoleEnum.Admin)
    @UseGuards(JwtGuard,RolesGuard)
    @Put('/edit/:id')
    @UseInterceptors(FileInterceptor('profile'))
    EditProfile(@UploadedFile() file:any,@Body() userInfo:UserUpdateValidation,@Param() id:any){
        
        return this.UserProvider.EditProfile(file,id,userInfo);
    }

    @Status(RoleEnum.Admin)
    @UseGuards(JwtGuard,RolesGuard)
    @Put('/changePassword/:id')
    @UseInterceptors(FileInterceptor('profile'))
    ChangePassword(@Body() data:any,@Param() id:any){
        // console.log(id);
        
        return this.UserProvider.ChangePassword(data.newPassword,id)
    }
}
