import { User } from 'src/user/entities/user.entity';
import {Status} from '../../base/enums';

export class Blocked {
    id : bigint
    blockedId: bigint
    userId: bigint
    status: Status
    createDate: Date
    createBy: bigint
    updateDate?: Date
    updateBy?: bigint
    user: User
}