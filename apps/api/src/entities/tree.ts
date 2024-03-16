import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Commit } from "./commit";

@Entity("tree", { schema: "github" })
export class Tree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "sha", nullable: true })
  sha: string;

  @Column({ name: "url", nullable: true })
  url: string;

  // RELATIONSHIPS -------------------------------------------------------- //
  @OneToMany(() => Commit, (commit) => commit.tree)
  commits: Commit[];
}
