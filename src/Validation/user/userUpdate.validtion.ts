import { IsEmail, IsNotEmpty} from "class-validator"

export class UserUpdateValidation{

    email : string;


    username : string ;


    firstname : string ;


    lastname : string ;


    passwordConfirm : string ;

    attachment:string;

}