import {
  Entity,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  title!: string;

  @Column()
  description?: string;

  @Column({ name: 'author_uid' })
  authorUid!: string;

  @Column({ name: 'executer_uid' })
  executerUid!: string;

  @Column({ name: 'project_uid' })
  projectUid!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne((_) => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_uid', referencedColumnName: 'uid' })
  project!: ProjectEntity;

  @ManyToOne((_) => UserEntity, (user) => user.authorTasks)
  @JoinColumn({ name: 'author_uid', referencedColumnName: 'uid' })
  author!: UserEntity;

  @OneToOne((_) => UserEntity, (user) => user.executerTasks)
  executer!: UserEntity;

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuid();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }
}
