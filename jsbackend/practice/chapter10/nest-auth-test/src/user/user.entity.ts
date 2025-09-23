import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true }) // 이메일은 고유해야 합니다.
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true }) // JSON으로 변환될 때 (응답 시) 이 필드를 제외합니다.
    password: string

    @Column()
    username: string;

    @CreateDateColumn() // 엔티티 생성 시 자동으로 날짜/시간 기록
    createdAt: Date;

    @UpdateDateColumn() // 엔티티 업데이트 시 자동으로 날짜/시간 기록
    updatedAt: Date;
}