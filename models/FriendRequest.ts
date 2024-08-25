import mongoose from 'mongoose';
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
    friend_req_id: {
        type: String,
        required: true,
        unique: true
    },
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
      }
});

const FriendRequest = mongoose.model('FriendRequestSchema', FriendRequestSchema);
export default FriendRequest;