import { Injectable ,ForbiddenException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { UserLoginValidation, UserValidation } from 'src/Validation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist';
var download = require('download-file')
import * as  fs from "fs";
import { FileService } from 'src/File/file.service';
@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwt : JwtService,
        private config : ConfigService,
        private fileService:FileService
        ){
            
        }
        async register(file:any,userInfo:UserValidation){
            if(file){
                // console.log("hi")
                var newName=this.fileService.SaveImage(file,'file/user')
            }else{
                var url = `https://api.multiavatar.com/${userInfo.username}.png`
                const preUnique=Math.floor(Math.random()*10e10+9999999);

                var newName=`${userInfo.username}-${preUnique}.png`
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
                const salt= await bcrypt.genSalt();
                const hasPassword= await bcrypt.hash(userInfo.password,salt);
                this.prisma
                const user = await this.prisma.user.create({
                    data: {
                        email:userInfo.email,
                        password:hasPassword,
                        username:userInfo.username,
                        firstName:userInfo.firstname,
                        lastName:userInfo.lastname,
                        statusId:Number(userInfo.statusId),
                        profile:newName!="" || newName!=null ?newName:""
                    },
                });
                const token=await this.generateToken(user.id,user.email,user.statusId)
                delete user.password;
                return {data : {
                    access_token:token,
                    user,
                    msg:"Register Successfull"
                }}
            }catch(error){
                if(error instanceof PrismaClientKnownRequestError){
                    if(error.code=='P2002'){
                        throw new ForbiddenException("Credentail taken")
                    }
                }
                return {msg: error}
            }
            
        }
        
        
        async Login(userInfo:UserLoginValidation){
            
            const user =await this.prisma.user.findFirst({
                where:{
                    OR:[
                        {email:userInfo.EUID},
                        {username:userInfo.EUID},
                        
                    ],
                    AND:[
                        {isactive:true}
                    ]
                },
                
            })
            if(!user){
                throw new ForbiddenException("Incorrect username or Password")
            }
            
            const isIdenticallPass = await bcrypt.compare(userInfo.password,user.password);
            if(!isIdenticallPass)throw new ForbiddenException("Incorrect username or Password")
            
            const token=await this.generateToken(user.id,user.email,user.statusId)
            delete user.password;
            return {data : {
                access_token:token,
                user,
                msg:"Register Successfull"
            }}
            
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
    