import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Commit } from "./commit";

@Entity("committer", { schema: "github" })
export class Committer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "email", nullable: true })
  email: string;

  @Column({ name: "date", nullable: true })
  date: Date;

  // RELATIONSHIPS -------------------------------------------------------- //
  @OneToMany(() => Commit, (commit) => commit.committer)
  commits: Commit[];
}
