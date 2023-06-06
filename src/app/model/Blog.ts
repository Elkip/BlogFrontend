export class Blog {
  id: string;
  title: string;
  tags = Array<string>();
  imageUrl: string;
  content: string;

  static fromHttp(blog: Blog): Blog {
    const newPost = new Blog();
    newPost.title = blog.title;
    newPost.imageUrl = blog.imageUrl;
    newPost.content = blog.content;
    for (const tag of blog.tags) {
      newPost.tags.push(tag);
    }
    return newPost;
  }
}
