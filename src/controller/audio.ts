import { RequestHandler } from "express";
import cloudinary from "../cloud";
import { audioModel } from "../models";
import formidable from "formidable";

interface ICreateAudioReq extends IReqWithFiles {
	body: {
		title: string;
		about: string;
		category: TCategoriesPlaylist;
	};
}
export const createAudio: RequestHandler = async (req: ICreateAudioReq, res) => {
	const { title, about, category } = req.body;
	const poster = req.files?.poster;
	const audioFile = req.files?.file as formidable.File;
	const ownerId = req.user.id;
	if (audioFile === undefined) return res.status(422).json({ error: "Audio file is missing!" });

	const audioRes = await cloudinary.uploader.upload(audioFile.filepath, {
		resource_type: "video",
	});

	const newAudio = new audioModel({
		title,
		about,
		category,
		poster,
		owner: ownerId,
		file: { url: audioRes.url, publicId: audioRes.public_id },
	});

	if (poster !== undefined) {
		const posterRes = await cloudinary.uploader.upload(poster.filepath, {
			width: 300,
			height: 300,
			crop: "thumb",
			gravity: "face",
		});

		newAudio.poster = {
			url: posterRes.secure_url,
			publicId: posterRes.public_id,
		};
	}

	await newAudio.save();

	res.status(201).json({
		audio: {
			title,
			about,
			file: newAudio.file.url,
			poster: newAudio.poster ? newAudio.poster.url : undefined,
		},
	});
};

export const updateAudio: RequestHandler = async (req: ICreateAudioReq, res) => {
	const { title, about, category } = req.body;
	const poster = req.files?.poster;
	const ownerId = req.user.id;

	const { audioId } = req.params;

	const audio = await audioModel.findOneAndUpdate(
		{ owner: ownerId, _id: audioId },
		{ title, about, category },
		{ new: true },
	);

	if (audio === null) return res.status(404).json({ error: "Record not found!" });

	if (poster !== undefined) {
		if (audio.poster?.publicId !== undefined) {
			await cloudinary.uploader.destroy(audio.poster.publicId);
		}
		const posterRes = await cloudinary.uploader.upload(poster.filepath, {
			width: 300,
			height: 300,
			crop: "thumb",
			gravity: "face",
		});

		audio.poster = {
			url: posterRes.secure_url,
			publicId: posterRes.public_id,
		};
		await audio.save();
	}

	res.status(201).json({
		audio: {
			title,
			about,
			file: audio.file.url,
			poster: audio.poster ? audio.poster.url : undefined,
		},
	});
};
