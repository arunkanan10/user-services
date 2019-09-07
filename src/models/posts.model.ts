import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  id: number;
  userId: string;
  title : string;
  body: string
}

const PostSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String }
});

export default mongoose.model<IPost>('Post', PostSchema);
