import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostEntity> {
        // find the post with this id
        const post = await this.postService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // create a new post and return the newly created post
        return await this.postService.create(post, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':postId/like')
    async addLike(@Param('postId') postId: string, @Body('userId') userId : string): Promise<PostEntity> {
    
        const post = await this.postService.findOne(postId);
        console.log("\n\nBefore update",post);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        if(!post.likes) {
            post.likes = []
        }
        post.likes = post.likes ? [...post.likes, userId] : [userId];

        await post.save()
        return post;
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Put(':postId/comment')
    async addComment(@Param('postId') postId: string, @Body() comment : JSON): Promise<PostEntity> {
    
        const post = await this.postService.findOne(postId);
        console.log("\n\nBefore update",post);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        if(!post.comments) {
            post.comments = []
        }
        post.comments = post.comments ? [...post.comments, comment] : [comment];

        await post.save()
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':postId/like')
    async removeLike(@Param('postId') postId: string, @Body('userId') userId: string): Promise<PostEntity> {
      // Remove the user's ID from the likes array for the specified post
      const post = await this.postService.findOne(postId);

      if (!post) {
        throw new NotFoundException('This Post doesn\'t exist');
      }
    
      console.log('Before removal:', post.likes);
    
      const userIndex = post.likes.indexOf(userId);
    
      if (userIndex !== -1) {
        post.likes.splice(userIndex, 1);
        await post.save();
    
        console.log('After removal:', post.likes);
    
        return post;
      } else {
        // If the user hasn't liked the post, you can handle it as needed, for example, throw an exception
        throw new ConflictException('User has not liked this post');
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost } = await this.postService.update(id, post, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.postService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}