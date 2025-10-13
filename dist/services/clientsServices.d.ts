import type { PersonalInfo } from "../types/user";
export declare class ValidateClientInput {
    infoObject: Partial<PersonalInfo>;
    constructor(infoObject: Partial<PersonalInfo>);
    validate(): any;
}
export declare class ClientsServices {
    updatePersonalInfo(userId: string, data: Partial<PersonalInfo>, role: 'professional' | 'client'): Promise<any>;
    getClients(personalUserId: string, role: 'professional' | 'client', specificClientId?: string): Promise<any>;
}
//# sourceMappingURL=clientsServices.d.ts.map