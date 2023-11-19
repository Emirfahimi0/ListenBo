import path from "path";
import { CHARACTER } from "../constant";
import { generateEmail, generateEmailTemplate } from "../mail/template";
import { MAIL_TRAP_SENDER } from "./variables";
import { Request } from "express";
import { historyModel } from "../models";
import moment from "moment";

export const generateToken = (length = 6) => {
	let token = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * CHARACTER.length);
		token += CHARACTER[randomIndex];
	}

	return token;
};

interface IProfile {
	email: string;
	name?: string;
	link?: string;
}

export const handleEmailSender = async (createdUser: IProfile, emailTemplate: IEmailOptions, subject: string) => {
	const { email, name, link } = createdUser;

	const nodeMailer = generateEmail();
	nodeMailer.sendMail({
		to: email,
		subject: "",
		from: MAIL_TRAP_SENDER,
		html: generateEmailTemplate(emailTemplate),
		attachments: [
			{
				filename: "logo.png",
				path: path.join(__dirname, "../mail/images/logo.png"),
				cid: "logo",
			},
		],
	});
};

export const formatProfile = (user: IUserDocument) => {
	return {
		id: user._id,
		name: user.name,
		email: user.email,
		verified: user.verified,
		avatar: user.avatarFile?.url,
		followers: user.followers.length,
		following: user.followings.length,
	};
};

export const handleUserPreviousHistory = async (req: Request): Promise<string[]> => {
	const [result] = await historyModel.aggregate([
		{ $match: { owner: req.user.id } },
		{ $unwind: "$all" },
		{ $match: { "all.date": { $gte: moment().subtract(30, "days").toDate() } } },
		{ $group: { _id: "$all.audio" } },
		{ $lookup: { from: "audios", localField: "_id", foreignField: "_id", as: "audioData" } },
		{ $unwind: "$audioData" },
		{ $group: { _id: null, category: { $addToSet: "$audioData.category" } } },
	]);

	return result !== null ? result.category : [];
};
