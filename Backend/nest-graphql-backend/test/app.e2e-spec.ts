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

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe(gql, () => {
    describe('student', () => {
      it('should create a startingYear', async () => {
        return await request(app.getHttpServer())
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

      it('should create an university', async () => {
        return await request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {createNewUniversity(createUniversityInput: { universityName: "Chalmers"}) {universityName}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createNewUniversity).toEqual({
              universityName: 'Chalmers',
            });
          });
      });

      it('should create an education', async () => {
        return await request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {createNewEducation(createEducationInput: { educationName: "Mjukvaruteknik", symbol: "U", universityName: "Chalmers"}) {educationName, symbol, university {universityName} }}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createNewEducation).toEqual({
              educationName: 'Mjukvaruteknik',
              symbol: 'U',
              university: { universityName: 'Chalmers' },
            });
          });
      });

      it('should create a student', async () => {
        return await request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {createNewRegularuser(createRegularuserInput: { email: "erikbirgersson98@gmail.com", password: "Brummer98", universityName: "Chalmers", educationName: "Mjukvaruteknik", startingYear: 2019}) {email, startingYear, createdAt }}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createNewRegularuser).toEqual({
              createdAt: res.body.data.createNewRegularuser.createdAt,
              email: 'erikbirgersson98@gmail.com',
              startingYear: 2019,
            });
          });
      });

      it('should login user and return access token', async () => {
        return await request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {loginUser(loginUserInput: { email: "erikbirgersson98@gmail.com", password: "Brummer98" }) {access_token}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.loginUser).toEqual({
              access_token: res.body.data.loginUser.access_token,
            });
          });
      });
    });
  });
});
