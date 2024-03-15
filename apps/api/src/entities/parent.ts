import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Commit } from "./commit";

@Entity("parent", { schema: "github" })
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  url: string;

  @Column()
  html_url: string;

  @ManyToOne(() => Commit, (commit) => commit.parents)
  commit: Commit;
}
