import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { ConfigService } from '@nestjs/config/dist';
let config=new  ConfigService()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb'}));

  app.useGlobalPipes(new ValidationPipe({
    // whitelist:true
  }))


  await app.listen(config.get('PORT'),()=>{
    console.log(`Server run on http://localhost:${config.get('PORT')}`);
    
  });
}
bootstrap();
