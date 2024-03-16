import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Committer } from "./committer";
import { Commit } from "./commit";

@Entity("repocommit", { schema: "github" })
export class RepoCommit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  url: string;

  @Column()
  html_url: string;

  @Column()
  comments_url: string;

  @Column()
  node_id: string;

  // RELATIONSHIPS -------------------------------------------------------- //
  //   @ManyToOne(() => Committer, (author) => author.id)
  //   @JoinColumn({ name: "author_id" })
  //   author: Committer;

  @OneToOne(() => Commit, (commit) => commit.id)
  @JoinColumn({ name: "commit_id" })
  commits: Commit;
}
