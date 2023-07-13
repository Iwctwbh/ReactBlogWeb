import {API} from "../utils/config";
import request, {request2} from "../utils/request";

export function getPosts(body: string) {
  return request.fetch(API.GetPostsURL, body);
}

export default class abc extends request2 {
  getData() {
    return new Promise((resolve, reject) => {
      this.fetchGet({
        url: API.GetPostsURL,
        data: {}
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
}