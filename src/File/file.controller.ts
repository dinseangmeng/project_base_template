import {Controller,Get,Res,Query,Post, UseGuards, UseInterceptors, UploadedFile, Req, Delete, Param, Put} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from 'src/Auth/guard/jwt.guard'
import { FileService } from './file.service'
import { Request } from 'express';
import {existsSync} from 'fs'
@Controller('file')
export class FileController{
    constructor(private fileService:FileService){}
    
    @Get()
    getFile(@Query('filePath') imagePath, @Res() res){
        // return imagePath;
        if(existsSync(imagePath)){
            return res.sendFile(imagePath,{root:'./'})
        }
        return res.send("<h1 style='color:red;width: 100%;height: 100vh;display:flex;justify-content:center;align-items: center;font-size:3rem;'>File Not Found</h1>")
    }
  
    @Post('postfile')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))
    addFileImage(@UploadedFile() file:any, @Req() reg:Request){
        return this.fileService.AddFile(file,reg.user);
    }   

    @Get('list')
    @UseGuards(JwtGuard)
    ListMyFile(@Req() reg:Request){
        return this.fileService.listing(reg.user)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    Delete(@Param() id:number,@Req() reg : Request){
        return this.fileService.DeleteFile(id,reg.user)
    }


    @Put(':id')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file'))
    Update(@UploadedFile() file:any,@Param() id:number,@Req() reg : Request){
        return this.fileService.UpdateFile(file,id,reg.user)
    }

}