const { ApolloServer, gql } = require("apollo-server");
const Courses = require("./courses");

const typeDefs = gql`
  type Course {
    id: Int!
    title: String
    author: String
    description: String
    url: String
  }
  type Query {
    getCourses: [Course]
    getSingleCourse(id: Int!): Course
  }

  type Mutation {
    createCourse(
      id: Int!
      title: String
      author: String
      description: String
      url: String
    ): Course
  }
`;
const resolvers = {
  Query: {
    getCourses: () => Courses,
    getSingleCourse: (parent, args) => {
      const { id } = args;
      return Courses.filter((course) => {
        return course.id == id;
      })[0];
    },
  },
  Mutation: {
    createCourse: (parent, args) => {
      Courses.push(args);
      console.log(Courses);
      return args;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
