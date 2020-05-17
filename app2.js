const { ApolloServer, gql } = require("apollo-server");
const Post = require("./Schema");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String, content: String): Post!
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.find();
      return posts;
    },
    post: async (parent, args) => {
      const post = await Post.findById(args.id);
      return post;
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { title, content } = args;
      const post = await Post.create({ title, content });
      return post;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
