import { IsNotEmpty} from "class-validator"
export class passwordChangeValidation {
    @IsNotEmpty()
    currentPassword:string
    @IsNotEmpty()
    newPassword:string
    @IsNotEmpty()
    confirmPawword:string
};