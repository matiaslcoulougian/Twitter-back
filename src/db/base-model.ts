import { Model } from 'objection';

export class BaseModel extends Model {
  public static tableName: string;

  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public $beforeInsert() {
    this.createdAt = new Date();
  }

  public $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
