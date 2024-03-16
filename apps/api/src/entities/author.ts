import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Commit } from "./commit";
import { Committer } from "./committer";

@Entity("author", { schema: "github" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "email", nullable: true })
  email: string;

  @Column({ name: "date", nullable: true })
  date: Date;

  // RELATIONSHIPS -------------------------------------------------------- //
  @OneToMany(() => Commit, (commit) => commit.author)
  commits: Commit[];
}
