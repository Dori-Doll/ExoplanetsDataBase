import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field()
  pl_name: string;

  @Field()
  hostname: string;

  @Field(() => Int, { nullable: true })
  disc_year?: number | null;

  @Field(() => Float, { nullable: true })
  pl_bmasse?: number | null; // Earth Mass

  @Field(() => Float, { nullable: true })
  sy_dist?: number | null; // Distance in parsecs
}
