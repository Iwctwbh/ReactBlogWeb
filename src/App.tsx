import React, {useState} from "react";
import logo from "./logo.svg";
import {Button, DatePicker} from "antd";
import "./App.css";
import {blogPost} from "src/types/blogPost";

function UlPostsData(): JSX.Element {
  const [postsData, setPostsData] = useState(Array<blogPost>);

  return (
    <div>
      <ButtonGetData
        postsData={postsData}
        clickEvent={setPostsData}
      />
      <ListPosts
        postsData={postsData}
      />
    </div>
  );
}


function ButtonGetData({clickEvent, postsData}: {
  clickEvent: (textData: Array<blogPost>) => void,
  postsData: Array<blogPost>
}): JSX.Element {
  console.log("logButtonGetData");
  return (
    <Button
      type="primary"
      onClick={
        () => {
          fetch("http://10.11.12.18:5231/GetPosts",
            {
              method: "Post",
              headers: new Headers({
                "Content-Type": "application/json"
              }),
              body: JSON.stringify({"skip": "0"})
            })
            .then((response) => response.json())
            .then((jsonResult: Array<blogPost>) => clickEvent(jsonResult));
        }
      }
    >
      Primary Button
    </Button>
  );
}

function ListPosts({postsData}: {
  postsData: Array<blogPost>
}): JSX.Element {
  console.log("logListPosts");
  return (
    <ul>
      {postsData.map((m: blogPost) => <li key={m.Id}>Id:{m.Id} Title{m.Title} Content{m.Content}</li>)}
    </ul>
  );
}

function App(): JSX.Element {
  return (
    <div className="App">
      <UlPostsData />
    </div>
  );
}

export default App;
