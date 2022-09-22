import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }


  @Get(':id')
  findUser(@Param('id', ValidationPipe, ParseIntPipe) id: number) {
    return this.usersService.findUser(id);
  }

}
