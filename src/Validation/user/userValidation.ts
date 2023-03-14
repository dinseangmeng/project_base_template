import { IsEmail, IsNotEmpty} from "class-validator"
import {attach} from '../attachment'
export class UserValidation{
    @IsEmail()
    email : string;

    @IsNotEmpty()
    password : string ;

    @IsNotEmpty()
    username : string ;

    @IsNotEmpty()
    firstname : string ;

    @IsNotEmpty()
    lastname : string ;
    
    @IsNotEmpty()
    statusId : number ;

    profile:string;

    attachment: attach;
}