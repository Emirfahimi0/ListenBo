type TCategoriesPlaylist =
  | "Art"
  | "Business"
  | "Education"
  | "Entertainment"
  | "Kids & Family"
  | "Music"
  | "Science"
  | "Tech"
  | "Others";

type TPopulateFavList = IAudioDocument<{ _id: ObjectId; name: string }>[];
