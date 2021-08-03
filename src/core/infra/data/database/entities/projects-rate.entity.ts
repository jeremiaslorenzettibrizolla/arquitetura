import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

@Entity({name: 'projects_rate'})
export class ProjectsRateEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;

    @Column()
    rate!: number;

    @Column({name: 'user_uid'})
    userUid!: string;

    @Column({name: 'project_uid'})
    projectUid!: string;

    @Column({name: 'created_at'})
    createdAt!: Date;

    @Column({name: 'updated_at'})
    updatedAt!: Date;

    @ManyToOne(_ => UserEntity, user => user.projectRate)
    @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    user!: UserEntity;

    @ManyToOne(_ => ProjectEntity, project => project.projectRate)
    @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    project!: UserEntity;

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
