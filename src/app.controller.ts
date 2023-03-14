import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class AppController {
    
    @Get('')
    Home(@Res() res){
        return res.sendFile('./asset/index.html',{root:'./src'})
    }
}
