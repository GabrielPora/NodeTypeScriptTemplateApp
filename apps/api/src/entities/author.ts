import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("author", { schema: "github" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  date: Date;
}
