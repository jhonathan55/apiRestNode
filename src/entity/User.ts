import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, ObjectIdColumn, ObjectId, Column, Unique } from "typeorm"
import * as bcrypt from "bcryptjs"
@Entity()
@Unique(["email"])
export class User {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    password: string

    hashPassword() {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
}
