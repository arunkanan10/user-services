import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: number;
  name: string;
  username : string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

const UserSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  address: {
    street: { type: String },
    suite: { type: String },
    city: { type: String },
    zipcode: { type: String },
    geo: {
      lat: { type: String },
      lng: { type: String }
    }
  },
  phone: { type: String },
  website: { type: String },
  company: {
    name: { type: String },
    catchPhrase: { type: String },
    bs: { type: String }
  }
});

export default mongoose.model<IUser>('User', UserSchema);
