import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  readonly username: string;

  @ApiPropertyOptional({ description: '昵称' })
  readonly nickname: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly password: string;

  @ApiPropertyOptional({ description: '头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: 'Email' })
  readonly email: string;
}
