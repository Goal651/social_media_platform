import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    names: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: []
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    unreadMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }],
    lastActiveTime: { type: Date, default: Date.now },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
})

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }],
    image: { type: String, default: '' },
    privateKey: { type: String, required: true },
    iv: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    messageType: { type: String, required: true },
    seen: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    reaction: [{
        reaction: { type: String, default: '' },
        reactor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    replying: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    createdAt: { type: Date, default: Date.now },
})

const groupMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    content: { type: String, required: true },
    messageType: { type: String, required: true },
    seen: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        seenAt: { type: Date, default: Date.now }
    }],
    edited: { type: Boolean, default: false },
    reaction: [{
        reaction: { type: String, default: '' },
        reactor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    replying: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Message = mongoose.model('Message', messageSchema);
const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);

export default {
    User,
    Group,
    Message,
    GroupMessage
}