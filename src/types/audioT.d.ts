type TCategoriesPlaylist =
  | 'Art'
  | 'Business'
  | 'Education'
  | 'Entertainment'
  | 'Kids & Family'
  | 'Music'
  | 'Science'
  | 'Tech'
  | 'Others';

type TPopulateList = IAudioDocument<{ _id: ObjectId; name: string }>[];

type TPlaylistVisibility = 'Public' | 'Private' | 'auto';
type TPlaylistDefaultVisibility = 'Public' | 'Private';
