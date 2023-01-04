import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  dob: string;


  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}