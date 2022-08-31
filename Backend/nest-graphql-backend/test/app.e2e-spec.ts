import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GraphQL AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const gql = '/graphql';

  describe(gql, () => {
    describe('student', () => {
      it('should create a startingYear', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {createNewStartingYear(createStartingYearInput: { startingYear: 2019}) {startingYear}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createNewStartingYear).toEqual({
              startingYear: 2019,
            });
          });
      });
    });
  });
});
