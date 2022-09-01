import { gql } from "@apollo/client";

export const GET_ALL_UNIVERSITIES = gql`
query GetAllUniversities {
    universities {
        universityName
    }
}
`;

export const GET_UNIVERSITY_EDUCATIONS = gql`
query GetUnivsersityEducation($universityName: String!) {
    educationsFromUniversity(universityName: $universityName) {
      educationName
    }
}
`;

export const GET_ALL_STARTING_YEARS = gql`
query {
    startingYears {
      startingYear
    }
  }
`;

export const CHECK_IF_REGULAR_USER_EXISTS = gql`
query getStudent($email: String!) {
  getStudent(email: $email) {
    email
  }
}
`;