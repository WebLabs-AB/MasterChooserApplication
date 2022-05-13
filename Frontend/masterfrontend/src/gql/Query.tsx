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
    educationFromUniversity(universityName: $universityName) {
      symbol
    }
}
`;