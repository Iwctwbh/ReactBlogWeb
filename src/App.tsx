import React, {useState} from "react";
import logo from "./logo.svg";
import {Button, DatePicker} from "antd";
import "./App.css";
import {typeProduct} from "src/types/product";

function UlPostsData(): JSX.Element {
  const [postsData, setPostsData] = useState(Array<string>);

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
  clickEvent: (textData: Array<string>) => void,
  postsData: Array<string>
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
            .then((json) => {
              let tempData: Array<string> = [];
              json.map((m: { content: string; }) => {
                tempData.push(m.content);
              });
              clickEvent(tempData);
            });
        }
      }
    >
      Primary Button
    </Button>
  );
}

function ListPosts({postsData}: {
  postsData: Array<string>
}): JSX.Element {
  console.log("logListPosts");
  return (
    <ul>
      {postsData.map((m: string) => <li key={m}>{m}</li>)}
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
