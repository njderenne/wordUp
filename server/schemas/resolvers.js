const { PubSub, withFilter } = require('apollo-server');
const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Channel } = require('../models');
const { signToken } = require('../utils/auth');
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const CHANNEL_ADDED = 'CHANNEL_ADDED';

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                .populate('friends')
                .populate('channels');

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
        },
        channel: async (parent, { channelId }, context) => {
            if (context.user) {
                const channel = await Channel.findById({ _id: channelId })
                .populate('participants')
                .populate('messages');

                return channel;
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
                const updatedFriend = await User.findOneAndUpdate(
                    { _id: friendId },
                    { $addToSet: { friends: { _id: context.user._id } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedFriend = await User.findOneAndUpdate(
                    { _id: friendId },
                    { $pull: { friends: context.user._id } },
                    { new: true }
                );
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: friendId } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addMessage: async (parent, { channelId, messageText }, context) => {
            console.log(context.user);
            if (context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    { _id: channelId },
                    { $push: { messages: { messageText, email: context.user.email, sender: context.user.firstName} } },
                    { new: true },
                );
                await pubsub.publish(MESSAGE_ADDED, {messageAdded: updatedChannel } );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteMessage: async (parent, { channelId, messageId }, context) => {
            if (context.user) {
                const updatedChannel = await Channel.findOneAndUpdate(
                    { _id: channelId },
                    { $pull: { messages: { _id: messageId } } },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addChannel: async (parent, args, context) => {
            if (context.user) {
                const { firstName, lastName } = context.user;
                const fullName = `${firstName} ${lastName}`;
                const channel = await Channel.create({ ...args, createdBy: fullName, participants: context.user._id });

                await pubsub.publish(CHANNEL_ADDED, {channelAdded: channel } );

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { channels: channel._id } },
                    { new: true }
                );
                return channel
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeChannel: async (parent, { channelId }, context) => {
            if (context.user) {
                const channel = await Channel.findOneAndDelete({ _id: channelId });

                return channel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addParticipant: async (parent, args, context) => {
            if (context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    { _id: args.channelId },
                    { $addToSet: { participants: args.participants } },
                    { new: true }
                );
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: args.participants },
                    { $addToSet: { channels: args.channelId } },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeParticipant: async (parent, args, context) => {
            if (context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    { _id: args.channelId },
                    { $pull: { participants: args.participants } },
                    { new: true }
                );
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: args.participants },
                    { $pull: { channels: args.channelId } },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        changeChannelName: async (parent, { name, channelId }, context) => {
            if (context.user) {
                const updatedChannel = await Channel.findByIdAndUpdate(
                    { _id: channelId },
                    { name: name },
                    { new: true }
                );
                return updatedChannel;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Subscription: {
        messageAdded: {

            subscribe: withFilter (
                () => pubsub.asyncIterator([MESSAGE_ADDED]),
                    (payload, variables) => {
                        return (String(payload.messageAdded._id) === variables.channelId);
                    }
            )
        },
        channelAdded: {

            subscribe: withFilter (
                () => pubsub.asyncIterator([CHANNEL_ADDED]),
                    (payload, variables) => {
                        return (String(payload.channelAdded.participants[0]) === variables.userId);
                    }
            )
        }
    }
};

module.exports = resolvers;