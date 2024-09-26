import { IsNotEmpty } from "class-validator"
import { Entity, ObjectIdColumn, ObjectId, Column, Unique } from "typeorm"

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
    email: string
}
