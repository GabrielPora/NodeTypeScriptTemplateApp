import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Committer } from "./committer";
import { Tree } from "./tree";
import { Verification } from "./verification";
import { Author } from "./author";

@Entity("commit", { schema: "github" })
export class Commit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "message", nullable: true })
  message: string;

  @Column({ name: "comment_count", nullable: true })
  comment_count: number;

  @Column({ name: "url", nullable: true })
  url: string;

  // RELATIONSHIPS -------------------------------------------------------- //
  @ManyToOne(() => Author, (author) => author.commits, { cascade: true })
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author: Author;

  @ManyToOne(() => Committer, (committer) => committer.commits, { cascade: true })
  @JoinColumn({ name: "committer_id", referencedColumnName: "id" })
  committer: Committer;

  @ManyToOne(() => Verification, (verification) => verification.commits, { cascade: true })
  @JoinColumn({ name: "verification_id", referencedColumnName: "id" })
  verification: Verification;

  @ManyToOne(() => Tree, (tree) => tree.commits, { cascade: true })
  @JoinColumn({ name: "tree_id", referencedColumnName: "id" })
  tree: Tree;
}
