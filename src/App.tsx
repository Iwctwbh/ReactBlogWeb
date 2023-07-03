/** @jsxImportSource @emotion/react */
import React, {ReactElement, useState} from "react";
import {Card, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor from "@uiw/react-md-editor";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {css, SerializedStyles} from "@emotion/react";


// element
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

function PostCard({Title, Id, Content}: { Title: string, Id: number, Content: string }): ReactElement {
  const [cardStyle, setCardStyle] = useState<SerializedStyles>(cardMinusStyle);

  return (
    <Card
      key={Id}
      title={Title}
      extra={
        <a href="#">
          {
            cardStyle == cardMinusStyle ?
              <PlusOutlined
                css={iconHover}
                onClick={() => {
                  setCardStyle(cardPlusStyle);
                }}
              />
              :
              <MinusOutlined
                css={iconHover}
                onClick={() => {
                  setCardStyle(cardMinusStyle);
                }}
              />
          }
        </a>
      }
      css={cardStyle}
    >
      <MDEditor.Markdown source={Content} />
    </Card>
  );
}

function ListPosts({clickEvent, postsData}: {
  clickEvent: (textData: blogPosts) => void,
  postsData: blogPosts | undefined
}): ReactElement {
  // First load
  if (postsData === undefined) {
    fetch("http://10.11.12.30:5232/GetPosts",
      {
        method: "Post",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({skip: "0", take: "10", order: "asc", search: ""})
      })
      .then((response) => response.json())
      .then((jsonResult: blogPosts) => clickEvent(jsonResult));
  }
  return (
    <Space direction="vertical" size={16}>
      {postsData?.data.map((m: blogPost) => {
        return (
          <PostCard Id={m.Id} Title={m.Title} Content={m.Content}></PostCard>
        );
      })}
    </Space>
  );
}

// App
function App(): ReactElement {
  return (
    <div className="App">
      <UlPostsData />
    </div>
  );
}

// function

// style
const iconHover = css`
  &:hover {
    color: #252525;
  }
`;

const cardMinusStyle = css`
  max-width: 1000px;
  height: 200px;
  overflow: hidden;
`;

const cardPlusStyle = css`
  height: 100%;
  overflow: unset;
`;


// export
export default App;
