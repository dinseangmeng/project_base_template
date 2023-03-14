import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { FileService } from 'src/File/file.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guard/role.guard';
import { JwtStrategy } from './strategry';

@Module({
  imports:[JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RolesGuard,FileService]
})
export class AuthModule {}
