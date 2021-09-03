import {userSchema} from "@/components/user/models/schema/user.schema";
import {Model} from "objection";
import {BaseModel} from "@/db";

export class UserModel extends BaseModel{
    public static tablename = 'users';

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
    // public static get relationMappings() {
    //     return {
    //         role: {
    //             relation: Model.HasManyRelation,
    //             modelClass: RoleModel,
    //             join: {
    //                 from: `${this.tableName}.roleId`,
    //                 to: `${RoleModel.tableName}.id`,
    //             },
    //         },
    //     };
    // }
    //
    // public static fetchRelations() {
    //     return {
    //         role: true,
    //     };
    // }

}