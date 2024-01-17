import { UserService } from './user.service';
import { User } from "@prisma/client";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(user: User): Promise<User>;
    delete(id: number): Promise<User>;
    update(id: number, user: User): Promise<User>;
}
