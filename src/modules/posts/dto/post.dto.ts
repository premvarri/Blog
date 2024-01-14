import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    readonly mediaUrl: string;
}