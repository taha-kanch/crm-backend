import { Body, Controller, Param, Put, Request } from '@nestjs/common';
import { SubscribeUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Put("subscribe/:id")
    async subscribeUser(@Param('id') id: number, @Body() subscribeUser: SubscribeUserDto, @Request() req ) {
        return await this.userService.subscribeUser(id, subscribeUser);
    }

}
