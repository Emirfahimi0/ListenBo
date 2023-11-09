import { Router } from 'express';
import { isVerified, verifyAuth } from '../middleware/auth';

import {
  createPlaylist,
  getPlaylistAudios,
  getPlaylistByProfile,
  removePlaylist,
  updatePlaylist,
} from '../controller';
import { validator } from '../middleware/validator';
import { oldPlaylistValidation, playlistValidation } from '../utils';

export const playlistRouter = Router();

playlistRouter.post(
  '/create',
  verifyAuth,
  isVerified,
  validator(playlistValidation),
  createPlaylist,
);
playlistRouter.patch(
  '/update',
  verifyAuth,
  validator(oldPlaylistValidation),
  updatePlaylist,
);
playlistRouter.delete('/', verifyAuth, removePlaylist);
playlistRouter.get('/by-profile', verifyAuth, getPlaylistByProfile);
playlistRouter.get('/:playlistId', verifyAuth, getPlaylistAudios);
