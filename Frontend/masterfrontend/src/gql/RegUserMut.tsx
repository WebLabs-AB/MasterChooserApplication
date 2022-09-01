import { gql, useMutation } from "@apollo/client";


export const useNewRegularUserMutation =  () => {
    const [CreateNewRegularuser] = useMutation(gql`
    mutation createNewRegularuser($email: String!, $password: String!, $startingYear: Int!, $universityName: String!, $educationName: String!) {
      createNewRegularuser(createRegularuserInput: {
        email: $email,
        password: $password,
        startingYear: $startingYear,
        universityName: $universityName,
        educationName: $educationName
      }) {
    			email
  			}
    } 
    `
    );

    return (email: string, password: string, startingYear: number, universityName: string,
      educationName: string) => CreateNewRegularuser({variables: 
        { email, password, startingYear, universityName, educationName } });
  }
