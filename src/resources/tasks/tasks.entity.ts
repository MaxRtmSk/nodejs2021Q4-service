import {Entity, PrimaryGeneratedColumn,  Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "../user/user.entity";
import { Board } from "../board/board.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('varchar')
    title!: string;
  
    @Column('json')
    columns: {}[] = [];

    @Column()
    order: 'number'

    @Column()
    description: 'string'

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

    @Column()
    columnId: "null"
}
