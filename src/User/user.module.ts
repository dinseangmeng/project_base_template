import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/Auth/guard/role.guard';
import { JwtStrategy } from 'src/Auth/strategry';
import { FileService } from 'src/File/file.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService,FileService,JwtStrategy,RolesGuard]
})
export class UserModule {}
