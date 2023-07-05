declare module "src/types/blogPost" {
  export type blogPost = { Id: number, Title: string, Content: string, DateCreated: Date, DateModified: Date };
  export type blogPosts = { totalCount: number, data: Array<blogPost> };
  // export abstract class blogPosts  { totalCount: number; data: Array<blogPost> };
}