import express, { Express, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorization from "../middleware/authorization";
import User from "../models/User";
import FriendRequest from "../models/FriendRequest";
import { FriendRequestDto } from "../dto/FriendRequestDto";
import {v4 as uuidv4 } from 'uuid';
import { AllFriendsDto } from "../dto/AllFriendsDto";

dotenv.config();
const router = express.Router();
const jwtSecret = process.env.jwtSecret;

router.post(
    '/searchFriend', async (req: Request, res: Response) => {
        try {
            let friend = req.query.friend
            const searchFriend = await User.find({ name: { $regex: new RegExp('^' + friend + '$', 'i') } });
            if (!searchFriend) return res.status(400).json({statusMsg: 'Not Found'});
            return res.status(200).json(searchFriend);
        } catch (error: any) {
            return res.status(500).json({statusMsg: "Internal Server Error"});
        }
    }
)

router.post('/sendFriendRequest',
    [
        body('friendId', 'Enter Valid FriendId').isLength({ min: 1 }),
    ],
    authorization,
    async (req: any, res: Response) => {
        try {

            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            const { userId, friendId, friend, status } = req.body;

            if(req.user.id === friendId) return res.status(403).json({statusMsg: `Can't send friend request to self`});

           const currentUser = await User.findOne({user_id: req.user.id});
            if (!currentUser) return res.status(404).json({statusMsg: `Current User doesn't exists`});
            
            const friendObject = await User.findOne({user_id: friendId});
            if (!friendObject) return res.status(404).json({statusMsg: 'Not Found'});

            let existingRequest = await FriendRequest.find({ sender_id: currentUser.user_id, receiver_id: friendId });
            if (existingRequest.length !== 0) {
                if (existingRequest[0].status === 'pending') return res.status(200).json({statusMsg: 'Friend Request Pending'});
                return res.status(200).json({statusMsg: 'Friend Request Already sent'})
            }

            let friendRequest = new FriendRequest({
                friend_req_id: uuidv4().toString(),
                sender_id: req.user.id,
                receiver_id: friendId,
                sender: currentUser.name,
                receiver: friendObject.name,
                status: 'pending'
            })

            let friendRequestDto: FriendRequestDto = {
                sender_id: req.user.id,
                receiver_id: friendId,
                sender: currentUser.name,
                receiver: friendObject.name,
                status: 'pending',
                date: new Date()
            }

            await friendRequest.save();
            return res.status(200).json(friendRequestDto);
        } catch (error: any) {
            return res.status(500).json({statusMsg: 'Internal Server Error: ' + error.message});
        }
    }
)

router.get('/getPendingFriendRequests',
    authorization,
    async(req: any, res: Response) => {
        try {
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            const currentUser = await User.findOne({user_id: req.user.id});
            if (!currentUser) return res.status(404).json({statusMsg: 'Current User not found'});

            const friendRequest = await FriendRequest.find({ receiver_id: req.user.id, status: 'pending' })
            if (friendRequest.length === 0) return res.status(200).json({
                statusMsg: 'No Friend Requests found', 
                friendRequest: friendRequest
            });

            return res.status(200).json({
                statusMsg: 'success',
                friendRequest: friendRequest
            });
        } catch (error: any) {
            return res.status(500).json({statusMsg: 'Internal Server Error'});
        }
    }
)

router.post('/respondFriendRequest',
    [
        body('responseToId', 'Enter Valid FriendId').isLength({ min: 1 }),
    ],
    authorization,
    async (req: any, res: Response) => {
        try {
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            const { responseToId, action } = req.body;
            const currentUser = await User.findOne({ user_id: req.user.id });
            if (!currentUser) return res.status(404).json({statusMsg: 'Current User not found'});

            const friendRequest = await FriendRequest.findOne({ receiver_id: req.user.id, sender_id: responseToId })
            if (!friendRequest) return res.status(404).json({statusMsg: 'No Friend Requests found'});

            if (friendRequest.status === 'pending') {
                friendRequest.status = action;
            }else if(friendRequest.status === 'accept'){
                return res.status(400).json({statusMsg: 'Request already accepted'});
            }else if(friendRequest.status === 'decline'){
                return res.status(403).json({statusMsg: 'Request was declined'});
            }else {
                return res.status(404).json({statusMsg: 'Invalid'});
            }

            if(action === 'decline'){
                await FriendRequest.deleteOne({sender_id: responseToId});
                return res.status(202).json({statusMsg: 'Friend Request Deleted'});
            }

            await friendRequest.save();
            return res.status(200).json(friendRequest);
        } catch (error: any) {
            return res.status(500).json({statusMsg: 'Internal Server Error'});
        }
    })


router.get('/getAllFriends', authorization, async(req: any, res: Response) => {
    try{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ success, errors: errors.array() });
        }

        const currentUser = await User.findOne({user_id: req.user.id});
        if (!currentUser) return res.status(404).json({statusMsg: 'Current User not found'});

        const users = await User.find();
        const allFriends = users.filter(user => user.user_id !== currentUser.user_id);
        success = true;

        const friendRes: AllFriendsDto = {
            success: success,
            friends: allFriends
        }

        return res.status(200).json(friendRes);
    }catch(error: any){
        return res.status(500).json({statusMsg: 'Internal Server Error'});
    }
})

module.exports = router;