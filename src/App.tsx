import React, {useState} from "react";
import logo from "./logo.svg";
import {Button, DatePicker} from 'antd';
import "./App.css";

function myCard(): JSX.Element {
  return (
      <div>
        <h1>My Card</h1>
      </div>
  );
}

let arrayItems: Array<string> = new Array<string>();

// function MyPosts(): JSX.Element[] {
//   const [posts, setPosts] = useState(Array<string>);
//   fetch("http://10.11.12.18:5231/GetPosts",
//       {
//         method: 'Post',
//         headers: new Headers({
//           'Content-Type': 'application/json'
//         }),
//         body: JSON.stringify({"skip": "0"})
//       })
//       .then((response) => response.json())
//       .then((json) => {
//         arrayItems = new Array<string>();
//         json.map((m: { content: string; }) => {
//           arrayItems.push(m.content)
//         });
//         setPosts(arrayItems);
//       });
//   return (
//       posts.map(post => <li key={post}>{post}</li>)
//   );
// }


function PostsList({posts}: { posts: Array<string> }) {
  const rows: JSX.Element[] = [];

  posts.forEach((post: string) => {
    rows.push(
        <li key={post}></li>
    );
  });

  return (
      <ul>{rows.map(m => <li>m</li>)}</ul>
  );
}

function FilterableProductTable({posts}: { posts: Array<string> }) {
  return (
      <div>
        <PostsList posts={posts} />
      </div>
  );
}

let postsData: Array<string> = new Array<string>();

fetch("http://10.11.12.18:5231/GetPosts",
    {
      method: 'Post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({"skip": "0"})
    })
    .then((response) => response.json())
    .then((json) => {
      arrayItems = new Array<string>();
      json.map((m: { content: string; }) => {
        arrayItems.push(m.content)
      });
      postsData = arrayItems;
    });

function App(): JSX.Element {
  return (
      <div className="App">
        <FilterableProductTable posts={postsData} />
      </div>
  );
}

export default App;
