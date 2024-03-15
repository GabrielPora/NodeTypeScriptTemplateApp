import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Committer } from "./committer";
import { Tree } from "./tree";
import { Parent } from "./parent";
// import { Author } from "./author";

@Entity("commit", { schema: "github" })
export class Commit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  node_id: string;

  @ManyToOne(() => Committer)
  committer: Committer;

  @ManyToOne(() => Committer)
  author: Committer;

  @Column()
  message: string;

  @ManyToOne(() => Tree)
  tree: Tree;

  @Column()
  url: string;

  @Column()
  html_url: string;

  @Column()
  comments_url: string;

  @OneToMany(() => Parent, (parent) => parent.commit)
  parents: Parent[];

  // Define other columns and relationships as needed
}
