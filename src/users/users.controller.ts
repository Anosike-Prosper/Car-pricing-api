import { Controller , Post, Body, Get, Param, Patch, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor, Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';


@Controller('auth')
@Serialize(UserDto)
export class UsersController { 
    userService:UsersService
    constructor(userService:UsersService){
      this.userService = userService
    }
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        this.userService.create(body.email, body.password)

    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    
    @Get('/:id')
    async findUser(@Param('id') id:string){
        console.log('i am in the request handler')
        const user= await this.userService.findOne(parseInt(id))
        if(!user){
            throw new NotFoundException('user not found')
        }

        console.log('hereeeeeeeeeeeeeeee')
        return user
    }


    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email)

        }

        @Delete('/:id') 
        removeUser(@Param('id') id:string){
            return this.userService.remove(parseInt(id))
        }

        @Patch('/:id')
        updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
            return  this.userService.update(parseInt(id),body )
        }



    

    
}
