import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import * as fs from 'fs' 
import * as bcrypt from 'bcrypt'
import { passwordChangeValidation, UserUpdateValidation } from 'src/Validation';
import { FileService } from 'src/File/file.service';
var download = require('download-file')
@Injectable()
export class UserService {
    constructor(
        private prisma:PrismaService,
        private fileService:FileService
        ){}
    

    async listing(){
        const n_user=await this.prisma.user.count({})

        const user=await this.prisma.user.findMany({

            select:{
                id:true,
                email:true,
                username:true,
                firstName:true,
                lastName:true,
                profile:true,
                created:true,
                updated:true,
                statusId:true,
                status:true,
                card:true
            },
            take:10,
        })
        return {n_user,user};
    }

    async Delete(userId:any,user:any){
        // console.log(user);
        
        if(userId.id==user.id) return {msg:"User can't delete your self"}
        const usertmp =await this.prisma.user.findFirst({
            where:{
                id:Number(userId.id)
            }
        });
        if(! user){return {msg:"User not found"}}

        try {
            fs.unlinkSync(`./file${usertmp.profile}`);
            //file removed
          } catch(err) {
            console.error(err)
          }
       

        return await this.prisma.user.delete({
            where:{
                id:Number(userId.id)
            }
        })
    }

    async EditProfile(file:any,userid:any,data:UserUpdateValidation){


        let tmp=await this.prisma.user.findFirst({
            where:{
                id:Number(userid.id)
            }
        })
        
        if(file){
            // console.log("hi")
            try {
                fs.unlinkSync(`${tmp.profile}`)
                //file removed
            } catch(err) {
                console.error(err)
            }
            var newName=this.fileService.SaveImage(file,'file/user')
        }else if(!tmp.profile){
            try {
                fs.unlinkSync(`${tmp.profile}`)
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
                    id:Number(userid.id)
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
    
    async ChangePassword(newpassword:string,userId:any){


        
        try{
            const salt= await bcrypt.genSalt();
            const hasPassword= await bcrypt.hash(newpassword,salt);
            await this.prisma.user.update({
                where:{
                    id:Number(userId.id)
                },
                data:{
                    password:hasPassword
                }
            })
    

            return {data : {
                msg:"Change password Successfull"
            }}
        }catch(error){
            if(error.code=='P2002'){
                throw new ForbiddenException("Credentail taken")
            }
            
            return {msg: error}
        }
    }
}
