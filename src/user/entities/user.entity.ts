import { Post } from 'src/post/entities/post.entity';
import {Status} from '../../base/enums';

export class User {
    id : bigint
    name: string
    username: string
    biyo: String
    status: Status
    createDate: Date
    createBy: bigint
    updateDate?: Date
    updateBy?: bigint
    post: Post[]
}