import { Body, Controller, Get, NotFoundException, Param, Put, Request } from '@nestjs/common';
import { SubscribeUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Put("subscribe/:id")
    async subscribeUser(@Param('id') id: number, @Body() subscribeUser: SubscribeUserDto, @Request() req) {
        return await this.userService.subscribeUser(id, subscribeUser);
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() user: User, @Request() req): Promise<User> {
        const { numberOfAffectedRows, updatedUser } = await this.userService.update(id, user);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This User does'nt exist");
        }
        return updatedUser;
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findOneById(id);
        if (!user) {
            throw new NotFoundException("This User does'nt exist");
        }
        return user;
    }

}
