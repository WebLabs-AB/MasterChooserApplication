import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGeneralRequirementsInput {
  @Field((type) => Int, {
    description: 'Required hp that is from advanced courses',
  })
  A1XHp: number;

  @Field((type) => Int, {
    description: 'Required hp in the education main area',
  })
  MainAreaHp: number;

  @Field(() => String, {
    description:
      'The name of the university that has these general requirements',
  })
  universityName: string;
}
