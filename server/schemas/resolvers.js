const { AuthenticationError } = require('apollo-server-express');
const { User, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate();
      
              return user;
            }
      
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
          return User.find()
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
        },
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        addFriend: async (parent, { friendId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { friends: friendId } },
              { new: true }
            );

            return updatedUser;
          }

          throw new AuthenticationError('You need to be logged in!');
        },
        addMessage: async (parent, args, context) => {
          if (context.user) {
            const message = await Message.create({ ...args, email: context.user.email });
        
            return message;
          }
      
          throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;