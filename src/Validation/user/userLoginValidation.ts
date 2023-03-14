import { IsEmail, IsNotEmpty} from "class-validator"

export class UserLoginValidation{
    @IsNotEmpty()
    EUID : string;

    @IsNotEmpty()
    password : string ;
}