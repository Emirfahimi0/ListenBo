import { RequestHandler } from 'express';
import { audioModel, playlistModel } from '../models';
import { isValidObjectId } from 'mongoose';

export const createPlaylist: RequestHandler = async (
  req: IReqPlaylistDocument,
  res,
) => {
  const { title, visibility, resId } = req.body;
  const ownerId = req.user.id;

  if (resId !== undefined) {
    const audio = await audioModel.findById(resId);
    if (audio === null)
      return res.status(404).json({ error: 'Could not found the audio' });
  }

  const newPlaylist = new playlistModel({ title, owner: ownerId, visibility });

  if (resId !== undefined) newPlaylist.items = [resId as any];
  await newPlaylist.save();

  res.status(201).json({
    playlist: {
      id: newPlaylist._id,
      title: newPlaylist.title,
      visibility: newPlaylist.visibility,
    },
  });
};

export const updatePlaylist: RequestHandler = async (
  req: IReqUpdatePlaylistDocument,
  res,
) => {
  const { id, item, title, visibility } = req.body;

  const playlist = await playlistModel.findByIdAndUpdate(
    { _id: id, owner: req.user.id },
    { title, visibility },
    { new: true },
  );

  if (playlist === null)
    return res.status(404).json({ error: 'Playlist Not Found!' });

  if (item !== undefined) {
    const audio = await audioModel.findById(item);
    if (audio === null)
      return res.status(404).json({ error: 'Audio Not Found!' });
    // playlist.items.push(audio._id);
    // await playlist.save();

    await playlistModel.findOneAndUpdate(playlist._id, {
      $addToSet: { items: item },
    });
  }

  res.status(201).json({
    playlist: {
      id: playlist._id,
      title: playlist.title,
      visibility: playlist.visibility,
    },
  });
};

export const removePlaylist: RequestHandler = async (req, res) => {
  const { playlistId, resId, all } = req.query;

  if (isValidObjectId(playlistId) === false)
    return res.status(404).json({ error: 'Invalid playlist id!' });

  if (all === 'yes') {
    const playlist = await playlistModel.findOneAndDelete({
      _id: playlistId,
      owner: req.user.id,
    });
    if (playlist === null)
      return res.status(404).json({ error: 'Playlist not found!' });
  }
  if (resId !== undefined) {
    if (isValidObjectId(resId) === false)
      return res.status(404).json({ error: 'Invalid audio id!' });
    const updatedPlaylist = await playlistModel.findOneAndUpdate(
      {
        _id: playlistId,
        owner: req.user.id,
      },
      {
        $pull: { items: resId },
      },
    );
    if (updatedPlaylist === null)
      return res.status(404).json({ error: 'Playlist not found!' });
  }

  res.json({ success: true });
};

export const getPlaylistByProfile: RequestHandler = async (req, res) => {
  const { pageNo = '0', limit = '20' } = req.query as {
    pageNo: string;
    limit: string;
  };
  const userPlaylist = await playlistModel
    .find({
      owner: req.user.id,
      visibility: { $ne: 'auto' },
    })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .sort('-createdAt');

  if (userPlaylist === null)
    return res.status(404).json({ error: 'No Playlists available!' });
  const playlists = userPlaylist.map((eachPlaylist) => {
    return {
      id: eachPlaylist._id,
      title: eachPlaylist.title,
      itemsCount: eachPlaylist.items.length,
      visibility: eachPlaylist.visibility,
    };
  });
  res.json({ playlists });
};

export const getPlaylistAudios: RequestHandler = async (req, res) => {
  const { playlistId } = req.params;

  if (isValidObjectId(playlistId) === false)
    return res.status(404).json({ error: 'Invalid Playlist ID!' });

  const playlist = await playlistModel
    .findOne({
      ownerId: req.user.id,
      _id: playlistId,
    })
    .populate<{ items: TPopulateList }>({
      path: 'items',
      populate: { path: 'owner', select: 'name' },
    });

  if (playlist === null) return res.json({ list: [] });
  const audios = playlist.items.map((playlistItem) => {
    return {
      id: playlistItem._id,
      title: playlistItem.title,
      category: playlistItem.category,
      file: playlistItem.file.url,
      poster: playlistItem.poster?.url,
      owner: { name: playlistItem.owner.name, id: playlistItem.owner._id },
    };
  });
  res.json({ list: { id: playlist._id, title: playlist.title, audios } });
};
