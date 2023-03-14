import { IsNotEmpty} from "class-validator"
export class attach {
    @IsNotEmpty()
    Name:String
    type:string
    base64:string
};