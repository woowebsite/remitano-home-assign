import { Entity, Column, BeforeInsert } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public safeResponse(): Partial<User> {
    const { id, email } = this;
    return { id, email };
  }
}
