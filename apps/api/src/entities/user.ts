import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "../interfaces/owner";

@Entity("user", { schema: "github" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  node_id: string;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  private: boolean;

  // Define owner as a JSON column
  @Column("simple-json")
  owner: Owner;

  @Column()
  html_url: string;

  @Column()
  description: string;

  @Column()
  fork: boolean;

  @Column()
  url: string;

  @Column()
  forks_url: string;

  // Define other URL columns as needed

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  pushed_at: Date;

  // Define other timestamp columns as needed

  @Column()
  git_url: string;

  @Column()
  ssh_url: string;

  // Define other URL columns as needed

  @Column()
  stargazers_count: number;

  @Column()
  watchers_count: number;

  // Define other count columns as needed

  @Column()
  language: string;

  @Column()
  has_issues: boolean;

  @Column()
  has_projects: boolean;

  // Define other boolean columns as needed

  @Column()
  forks_count: number;

  // Define other count columns as needed

  // Define other columns as needed
}

