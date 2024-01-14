import { Table, Column, Model, DataType, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { use } from 'passport';

@Table
export class Post extends Model<Post> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    mediaUrl: string;
}