import {
    decodeUserSessionAccessJWT,
    encodeUserSessionAccessJWT
} from "@/components/auth/services/utils/user-session-jwt";
import {UserService} from "@/components/user/services/user.services";
import argon2 from 'argon2';
export class AuthService{
    /**
     * Decodes an user session token and returns its userId.
     * @param token App session token
     * @returns Session user id
     */
    public static decodeSessionToken(token: string) {
        const { sub } = decodeUserSessionAccessJWT(token);
        return sub; // devuelve id del usuario
    }

    public static encodeUserSessionAccess(userId: string) {
        return encodeUserSessionAccessJWT(userId);
    }
    public static async authenticateUser({userName, password,}: {
        userName: string;
        password: string;
    }) {
        const user = await UserService.findUserByUserName(userName);
        const match = await argon2.verify(user.password, password);
        if (match) {
            const jwt = this.encodeUserSessionAccess(user.id);
            return { jwt, user };
        }
        throw new Error('Invalid login');
    }

    public static async validateToken({ jwt }: { jwt: string }) {
        const sub = await AuthService.decodeSessionToken(jwt);
        if (!sub) {
            throw new Error('Invalid token');
        }
        return await UserService.findUserById(sub);
    }
}