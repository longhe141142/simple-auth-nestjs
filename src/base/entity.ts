import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseE extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isDeleted: boolean;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  constructor(fields?: Partial<BaseE | any>) {
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
