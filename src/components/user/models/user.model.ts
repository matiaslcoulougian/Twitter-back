import {userSchema} from "@/components/user/models/schema/user.schema";
import {Model} from "objection";
import {BaseModel} from "@/db";
import argon2 from 'argon2';

export class UserModel extends BaseModel{
    public static tableName = 'users';

    public userName!: string;
    public password!: string;
    public name!: string;
    public mail!: string;
    public phone!: string;
    public birthDate!: string;
    public isActive!: boolean;
    public bibliography?: string;
    public location?: string;
    public website?: string;

    public static get jsonSchema(){
        return userSchema;
    }

    public async $beforeInsert() {
        const hashedPassword = await argon2.hash(this.password);
        this.$setJson({ password: hashedPassword }, { skipValidation: true });
        super.$beforeInsert();
    }

    public async $beforeUpdate() {
        if (this.password) {
            const hashedPassword = await argon2.hash(this.password);
            this.$setJson({ password: hashedPassword }, { skipValidation: true });
        }
        super.$beforeUpdate();
    }
}