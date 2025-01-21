"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import path from "path";

interface Params {
    text: string,
    author: string,
    communityId: string,
    path: string,
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();
        const createThread = await Thread.create({
            text,
            author,
            community: null,
            path,
        });

        // update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();

        // calculate the number of documents to skip
        const skipAmount = (pageNumber - 1) * pageSize;

        // query for threads
        const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User })
            .populate({ path: 'children', populate: { path: 'author', model: User, select: "_id name parentId image" } });

        const totalThreads = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

        const threads = await threadsQuery.exec();

        const isNext = totalThreads > skipAmount + threads.length;

        return { threads, isNext };
    } catch (error: any) {
        throw new Error(`Error fetching threads: ${error.message}`);
    }
}

export async function fetchThreadById(threadId: string) {
    try {
        connectToDB();

        const thread = await Thread.findById(threadId)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

        return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`);
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();
    try{
        const originalThread = await Thread.findById(threadId);
        if(!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        });
        
        const savedCommentThread = await commentThread.save();

        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();

        revalidatePath(path);
    } catch(error: any) {
        throw new Error(`Error adding comment to thread: ${error.message}`);
    }

}