const { AuthenticationError } = require('apollo-server-express');
const { user } = require('../config/connection');
const { User, Message, Channel } = require('../models');
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
              .populate('channels');
        },
        channels: async () => {
            return Channel.find()
                .select('-__v -password');

        },
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('friends')
                .populate('channels');
          
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
        addMessage: async (parent, { channelId, messageText }, context) => {
            if(context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    { _id: channelId },
                    { $push: { messages: { messageText, email: context.user.email } } },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addChannel: async (parent, args, context) => {
            if(context.user) {
                const channel = await Channel.create({ ...args, createdBy: context.user.email, participants: context.user._id });
                return channel
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addParticipant: async (parent, args, context) => {
            if(context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    {_id: args._id},
                    { $addToSet: { participants: args.participants } },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;