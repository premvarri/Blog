import { Table, Column, Model, DataType , HasMany} from 'sequelize-typescript';
import { Post } from '../posts/post.entity';

@Table
export class User extends Model<User> {
    
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
      })
      id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

    @Column({
        type: DataType.ENUM,
        values: ['M', 'f'],
        allowNull: false,
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    mobile_number: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password_hash: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
      })
      friendsList: string[];

      @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
      })
      friendsRequest: string[];
}