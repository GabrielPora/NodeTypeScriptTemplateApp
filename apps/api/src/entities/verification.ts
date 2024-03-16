import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Commit } from "./commit";

@Entity("verification", { schema: "github" })
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "verified", nullable: true })
  verified: boolean;

  @Column({ name: "reason", nullable: true })
  reason: string;

  @Column({ name: "payload", nullable: true })
  payload: string;

  @Column({ name: "signature", nullable: true })
  signature: string;

  // RELATIONSHIPS -------------------------------------------------------- //
  @OneToMany(() => Commit, (commit) => commit.verification)
  commits: Commit[];
}
