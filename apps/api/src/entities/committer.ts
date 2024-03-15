import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("committer", { schema: "github" })
export class Committer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  date: Date;
}
