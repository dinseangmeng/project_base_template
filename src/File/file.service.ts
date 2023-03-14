import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist';
import { createWriteStream , existsSync, mkdirSync,unlinkSync} from 'fs';

@Injectable()
export class FileService {
  constructor(
    private prisma :PrismaService,
    private config:ConfigService
    ){}
    
    SaveImage(file:any,path:string){
      if (!file) {
        throw new Error('No file uploaded');
      }
      const { originalname, buffer } = file;
      if (!buffer || buffer.length === 0) {
        throw new Error('Empty file buffer');
      }
      const fileName = `${Date.now()}_${originalname}`;
      var filePath = `./${path}/${fileName}`;
      if (!existsSync(`./${path}`)) {
        mkdirSync(`./${path}`);
      }
      const fileStream = createWriteStream(filePath);
      fileStream.on('error', (error) => {
        throw error;
      });
      fileStream.write(buffer);
      fileStream.end();
      return filePath;
    }
    
    PostOtherFile(file:any){
      let path='file/asset'
      if (!file) {
        throw new Error('No file uploaded');
      }
      const { originalname, buffer } = file;
      if (!buffer || buffer.length === 0) {
        throw new Error('Empty file buffer');
      }
      var fileName = `${Date.now()}_${originalname}`;
      var filePath = `./${path}/${fileName}`;
      if (!existsSync(`./${path}`)) {
        mkdirSync(`./${path}`);
      }
      const fileStream = createWriteStream(filePath);
      fileStream.on('error', (error) => {
        throw error;
      });
      fileStream.write(buffer);
      fileStream.end();
      return {fileName,filePath};
    }
    
    
    listing(user:any){
      const Files=this.prisma.file.findMany({
        where:{
          userId:user.id
        },
        include:{
          user:{
            select:{
              id:true,
              username:true,
              profile:true,
            },
          }
        }
      })
      return Files;
    }
    
    AddFile(file:any,user:any){
      const {fileName,filePath}= this.PostOtherFile(file)
      
      const newFile=this.prisma.file.create({
        data:{
          name:fileName,
          path:filePath,
          userId:Number(user.id),
        }
      })
      
      return newFile;
      
    }
    
    async DeleteFile(fileId:any,user:any){
      const Filetmp=await this.prisma.file.findFirst({
        where:{
          id:Number(fileId.id),
          userId:user.id
        }
      });
      if(! Filetmp){
        return {msg:"Card not found"}
      }
      // console.log("it going to delete");
      
      try {
        unlinkSync(`${Filetmp.path}`)
        //file removed
      } catch(err) {
        console.error(err)
      }
      const file = await this.prisma.file.delete({
        where:{
          id:Number(fileId.id),
        }
      })
      return file;
    }
    async UpdateFile(newFile:any,fileId:any,user:any){
      const Filetmp=await this.prisma.file.findFirst({
        where:{
          id:Number(fileId.id),
          userId:user.id
        }
      });
      if(! Filetmp){
        return {msg:"Card not found"}
      }
      // console.log("it going to delete");
      
      try {
        unlinkSync(`${Filetmp.path}`)
        //file removed
      } catch(err) {
        console.error(err)
      }

      const {fileName,filePath}= this.PostOtherFile(newFile)
      const file = await this.prisma.file.update({
        where:{
          id:Number(fileId.id),
        },
        data:{
          name:fileName,
          path:filePath,
          userId:Number(user.id)
        }
      })
      
      return file;
    }
    
  }
  