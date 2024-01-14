import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service'
import { User as PostEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) { }


    @UseGuards(AuthGuard('jwt'))
    @Put(':requestedBy/friendRequest')
    async addRequest(@Param('requestedBy') requestedBy: string, @Body('requestedTo') requestedTo : string): Promise<PostEntity> {
    
        const post = await this.UsersService.findOneById(requestedBy);
        console.log("\n\nBefore update",post);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        if(!post.friendsRequest) {
            post.friendsRequest = []
        }
        post.friendsRequest = post.friendsRequest ? [...post.friendsRequest, requestedTo] : [requestedTo];

        await post.save()
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':requestedBy/acceptRequest')
    async acceptRequest(@Param('requestedBy') requestedBy: string, @Body('acceptTo') acceptTo : string): Promise<PostEntity> {
    
        const post = await this.UsersService.findOneById(requestedBy);
        console.log("\n\nBefore update",post);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        const userIndex = post.friendsRequest.indexOf(acceptTo);
    
        if (userIndex !== -1) {
          post.friendsRequest.splice(userIndex, 1);
          await post.save();
        }

        if(!post.friendsRequest) {
            post.friendsList = []
        }
        post.friendsList = post.friendsList ? [...post.friendsList, acceptTo] : [acceptTo];

        await post.save()
        return post;
    }
}
