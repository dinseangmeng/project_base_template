import { Module } from '@nestjs/common';
import { FileService } from 'src/File/file.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,FileService]
})
export class UserModuleAdmin {}
