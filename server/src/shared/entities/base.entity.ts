import {
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
