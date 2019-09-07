import Post, { IPost } from '../models/posts.model';

class PostManager {

  public CreatePost(user): Promise<IPost> {

    return Post.create(user)
      .then((data: IPost) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
export default PostManager;
