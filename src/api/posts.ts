import {API} from "../utils/config";
import request from "../utils/request";

export function getPosts(body: string) {
  return request.fetch(API.GetPostsURL, body);
}