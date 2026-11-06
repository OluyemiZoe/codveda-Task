import UserModel from '../models/user.model.js';
import SavingsModel from '../models/savings.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        getMySavings: async (_, __, context) => {
            if (!context.user) {
                throw new GraphQLError('Authentication signature mandatory.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }
            return await SavingsModel.getByUserId(context.user.userId);
        }
    },
    Mutation: {
        signupUser: async (_, { username, password, role }) => {
            const exists = await UserModel.findByUsername(username);
            if (exists) throw new GraphQLError('Account profile name already active.');

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = await UserModel.create({ username, passwordHash, role });
            const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET);

            return { token, user: newUser };
        },

        loginUser: async (_, { username, password }) => {
            const user = await UserModel.findByUsername(username);
            if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
                throw new GraphQLError('Invalid credentials entered.', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }

            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
            return {
                token,
                user: { id: user._id, username: user.username, role: user.role }
            };
        },

        depositMoney: async (_, { amount }, context) => {
            if (!context.user) {
                throw new GraphQLError('Action Denied: Token validation required.', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }
            if (amount <= 0) throw new GraphQLError('Transaction threshold must exceed $0.00');

            const updatedProfile = await SavingsModel.addDeposit(context.user.userId, amount);

            // Task 2: WebSockets Real-Time Communication

            const io = context.app.get('io');
            const targetUserRoom = context.user.userId.toString();
            
            io.to(targetUserRoom).emit('balance_updated', {
                message: `Live Ledger: Secure deposit of $${amount.toFixed(2)} processed!`,
                newBalance: updatedProfile.balance
            });

            // Target check
            if (updatedProfile.balance >= updatedProfile.targetGoal) {
                io.to(targetUserRoom).emit('milestone_reached', {
                    message: ` Congratulations! You hit your savings target of $${updatedProfile.targetGoal.toFixed(2)}!`
                });
            }

            return updatedProfile;
        },

        setSavingsGoal: async (_, { target }, context) => {
            if (!context.user) {
                throw new GraphQLError('Action Denied: Token validation required.');
            }
            if (target <= 0) throw new GraphQLError('Financial target goal metrics must be positive.');

            return await SavingsModel.updateGoal(context.user.userId, target);
        }
    }
};
