import {Entity, PrimaryGeneratedColumn,  Column as TypeormColumn} from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @TypeormColumn('varchar')
    title!: string;
  
    @TypeormColumn('json')
    columns: {}[] | null = [];
}
