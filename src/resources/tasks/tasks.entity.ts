import {Entity, PrimaryGeneratedColumn,  Column, ManyToOne} from "typeorm";
import {User} from "../user/user.entity";
import { Board } from "../board/board.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('varchar')
    title!: string;
  
    @Column('json')
    columns: [] = [];

    @Column()
    order: number

    @Column()
    description: 'string'

    
    @Column({
        type: 'varchar',
        nullable: true,
        default: null,
    })
    columnId: "null" | "string"

    @ManyToOne(() => User, user => user.id, {
        nullable: true,
        cascade: true,
        onDelete: 'SET NULL',
      })
    user: string | null;
  
    
    @ManyToOne(() => Board, (board) => board.id, {
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE',
    })
    board: string | null;
}
