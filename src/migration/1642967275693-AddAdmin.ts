import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';



export class AddAdmin1642967275693 implements MigrationInterface {
    hashPassword: string;
    adminId: string;

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.adminId = uuidv4(); 
        this.hashPassword = await bcrypt.hash('admin', 6);
        await queryRunner.query(`INSERT INTO public."user" (id, "name", login, "password") VALUES('${this.adminId}', 'admin', 'admin', '${this.hashPassword}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public."user" WHERE login=${this.adminId};`);
    }

}
