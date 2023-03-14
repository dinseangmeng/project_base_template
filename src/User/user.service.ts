import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {  passwordChangeValidation, UserUpdateValidation, UserValidation } from 'src/Validation';
import * as bcrypt from 'bcrypt'
// import {User} from '..'
import * as  fs from "fs";
var download = require('download-file')
import { ConfigService } from '@nestjs/config/dist';
import { FileService } from 'src/File/file.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        private jwt : JwtService,
        private prisma:PrismaService,
        private config:ConfigService,
        private fileService:FileService
        ){}
        

        
        
        async EditProfile(file:any,userInforToken:any,data:UserUpdateValidation){
            const tmpUser=await this.prisma.user.findFirst({
                where:{
                    id:userInforToken.id
                }
            })
            // return tmpUser
            const isIdenticallPass = await bcrypt.compare(data.passwordConfirm,tmpUser.password);
            if(!isIdenticallPass)throw new ForbiddenException("Incorrect username or Password");
            
            
            if(file){
                // console.log("hi")
                var newName=this.fileService.SaveImage(file,'file/user')
                try {
                    fs.unlinkSync(`${tmpUser.profile}`)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
            }else if(!tmpUser.profile){
                try {
                    fs.unlinkSync(`${tmpUser.profile}`)
                    //file removed
                } catch(err) {
                    console.error(err)
                }
                var url = `https://api.multiavatar.com/${data.username }_${ data.firstname}_${ data.lastname}.png`
                const preUnique=Math.floor(Math.random()*10e10+9999999);
                
                var newName=`${data.username }_${ data.firstname}_${ data.lastname}-${preUnique}.png`
                var options = {
                    directory: "./file/user/",
                    filename: newName
                }
                newName=`./file/user/${newName}`
                
                download(url, options, function(err){
                    if (err) throw err
                    
                }) 
            }
            try{
                // console.log(userInforToken.id);
                
                const user=await this.prisma.user.update({
                    where:{
                        id:Number(userInforToken.id)
                    },
                    data:{
                        email:data.email,
                        username:data.username,
                        firstName:data.firstname,
                        lastName:data.lastname,
                        profile:newName!="" || newName!=null ? newName:""
                    },
                })
                delete user.password
                return user;
            }catch(error){
                if(error.code=='P2002'){
                    throw new ForbiddenException("Credentail taken")
                }
                
                return {msg: error}
            }
            
        }
        
        async ChangePassword(data:passwordChangeValidation,user:any){
            const tmpUser=await this.prisma.user.findFirst({
                where:{
                    id:user.id
                }
            })
            const isIdenticallPass = await bcrypt.compare(data.currentPassword,tmpUser.password);
            if(!isIdenticallPass)throw new ForbiddenException("Incorrect current Password");
            if(data.confirmPawword!=data.newPassword) throw new ForbiddenException("Invalid new Password");
            try{
                const salt= await bcrypt.genSalt();
                const hasPassword= await bcrypt.hash(data.newPassword,salt);
                await this.prisma.user.update({
                    where:{
                        id:user.id
                    },
                    data:{
                        password:hasPassword
                    }
                })
                const token=await this.generateToken(user.id,user.email,user.statusId)
                delete user.password;
                return {data : {
                    access_token:token,
                    msg:"Change password Successfull"
                }}
            }catch(error){
                if(error.code=='P2002'){
                    throw new ForbiddenException("Credentail taken")
                }
                
                return {msg: error}
            }
        }
        async generateToken(id:number, username:string,statusId:number): Promise<String>{
            const predata={
                id,
                username,
                statusId
            }
            const SECRETE_KEY=this.config.get('JWT_SECRET_KEY')
            return await this.jwt.signAsync(predata,{
                expiresIn:"30d",
                secret:SECRETE_KEY
            })
        }
    
    }
    