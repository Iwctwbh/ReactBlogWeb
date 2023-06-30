import React, {ReactElement, useState} from "react";
import {Card, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor, {commands} from "@uiw/react-md-editor";

function UlPostsData(): ReactElement {
  const [postsData, setPostsData] = useState<blogPosts>();

  return (
    <div>
      <ListPosts
        postsData={postsData}
        clickEvent={setPostsData}
      />
    </div>
  );
}

function ListPosts({clickEvent, postsData}: {
  clickEvent: (textData: blogPosts) => void,
  postsData: blogPosts | undefined
}): ReactElement {
  if (postsData === undefined) {
    fetch("http://10.11.12.30:5232/GetPosts",
      {
        method: "Post",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({skip: "114", take: "10", order: "asc", search: ""})
      })
      .then((response) => response.json())
      .then((jsonResult: blogPosts) => clickEvent(jsonResult));
  }
  return (
    <Space direction="vertical" size={16}>
      {postsData?.data.map((m: blogPost) => {
        return (
          <Card key={m.Id} title={m.Title} extra={<a href="#">More</a>} style={{width: 500}}>
            <p>Id:{m.Id} Title{m.Title}</p>
            <MDEditor.Markdown source={m.Content} />
          </Card>
        );
      })}
    </Space>
  );
}

function App(): ReactElement {
  return (
    <div className="App">
      <UlPostsData />
    </div>
  );
}

export default App;
