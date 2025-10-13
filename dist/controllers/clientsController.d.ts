import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/user";
export declare class ClientsController {
    protected userService: any;
    constructor(userService: any);
    updatePersonal(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    getClients(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=clientsController.d.ts.map