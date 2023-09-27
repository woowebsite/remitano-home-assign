import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { CreatedByDto } from './videos.dto';

@Entity()
export class Video extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'text',
  })
  sharedLink: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  youtubeId: string;

  @Column()
  likeBy?: string[];

  @Column()
  dislikeBy?: string[];

  @Column()
  createdBy: CreatedByDto;
}
