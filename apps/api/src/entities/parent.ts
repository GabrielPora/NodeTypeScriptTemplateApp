import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
