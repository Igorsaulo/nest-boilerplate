import {
  Controller,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Dependencies,
} from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from "@prisma/client";
import { HandleException } from '../utils/handleException';


@Controller('user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HandleException()
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HandleException()
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HandleException()
  async update(@Param('id') id: number, @Body() user: User) {
    return await this.userService.update(id, user);
  }
}
