import { sign } from 'jsonwebtoken';

export class RefreshToken{
    constructor(init?: Partial<RefreshToken>) {
        Object.assign(init);
    }
    userId: number;
    email:string;
    userAgent: string;
    ipAddress: string;

    sign(): string {
        return sign({ ...this }, process.env.REFRESH_SECRET);
    }
}