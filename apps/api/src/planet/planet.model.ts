import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('planets')
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  pl_name: string;

  @Field()
  @Column()
  hostname: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'int' })
  disc_year?: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  pl_bmasse?: number | null; // Earth Mass

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  sy_dist?: number | null; // Distance in parsecs
}
