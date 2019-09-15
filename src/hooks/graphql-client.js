export const GraphQLUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://workouterapi.herokuapp.com/graphql'
    : 'http://localhost:8080/graphql'
