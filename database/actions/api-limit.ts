"use server";
import { auth } from "@clerk/nextjs";
import apiLimitModel from "../models/apiLimit.model";
import { connectToDatabase } from "../mongoose";


const MAX_FREE_COUNTS = 5;

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if(!userId) return;
    try{
        await connectToDatabase();

        const userApiLimit = await apiLimitModel.findOne({userId});

        if(userApiLimit) {
            userApiLimit.count += 1;
            await userApiLimit.save();
        } else {
            await apiLimitModel.create({userId, count: 1});
        }
    } catch(err){
        console.log(err);
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if(!userId) return false;

    try{
        await connectToDatabase();
    
        const userApiLimit = await apiLimitModel.findOne({userId});

        if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true;
        else return false;
    } catch(err){
        console.log(err);
    }

};

  