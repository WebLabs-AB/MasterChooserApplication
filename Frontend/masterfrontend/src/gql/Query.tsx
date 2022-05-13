import { gql } from "@apollo/client";

export const GET_ALL_UNIVERSITIES = gql`
{
    universities {
        universityName
    }
}
`;