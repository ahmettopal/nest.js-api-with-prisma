import { User } from 'src/user/entities/user.entity';
import {Status} from '../../base/enums';

export class Post {
    id : bigint
    image: string
    description: string
    userId: bigint
    status: Status
    createDate: Date
    createBy: bigint
    updateDate?: Date
    updateBy?: bigint
    user: User
}