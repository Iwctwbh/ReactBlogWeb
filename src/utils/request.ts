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