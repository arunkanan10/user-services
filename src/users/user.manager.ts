import User, { IUser } from '../models/user.model';

class UserManager {

  public createUser(user): Promise<IUser> {

    return User.create(user)
      .then((data: IUser) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
 
  public getAllUsers() {
    User.find({}).then((data) => {
      return data;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
  } 
}

export default UserManager;
