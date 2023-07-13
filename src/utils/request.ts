export default class request {
  static async fetch(url: string, body?: string) {
    const response = await fetch(url,
      {
        method: "Post",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: body
      });
    return await response.json();
  }
}

export class request2 {
  fetchGet(options: { url: RequestInfo | URL; data: any; }) {
    return fetch(options.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options.data)
    }).then(res => {
      return res.json();
    }).catch(err => {
      console.log(err);
    });
  }
}