/** @jsxImportSource @emotion/react */
import React, {ReactElement, useState} from "react";
import {Button, Card, InputNumber, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor from "@uiw/react-md-editor";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {css, SerializedStyles} from "@emotion/react";

// element
const PostsCards: React.FC = () => {
  const [postsData, setPostsData] = useState<blogPosts>();
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [needRefreshData, setNeedRefreshData] = useState<boolean>(true);

  return (
    <>
      <Space size={16}>
        skip:
        <InputNumber defaultValue={skip} onChange={(v: number | null) => setSkip(v ?? 0)} />
        take:
        <InputNumber defaultValue={take} onChange={(v: number | null) => setTake(v ?? 10)} />
        <Button onClick={() => setNeedRefreshData(true)}>
          Get Data
        </Button>
      </Space>
      <div>
        <ListPosts
          postsData={postsData}
          clickEvent={setPostsData}
          skip={skip}
          take={take}
          needRefreshData={needRefreshData}
          refreshEvent={setNeedRefreshData}
        />
      </div>
    </>
  );
};

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

function ListPosts({clickEvent, postsData, skip, take, needRefreshData, refreshEvent}: {
  clickEvent: (textData: blogPosts) => void,
  postsData: blogPosts | undefined,
  skip: number,
  take: number,
  needRefreshData: boolean,
  refreshEvent: (needRefreshData: boolean) => void
}): ReactElement {
  // First load
  if (needRefreshData) {
    refreshEvent(false);
    fetch("http://10.11.12.30:5232/GetPosts",
      {
        method: "Post",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({skip: skip, take: take, order: "asc", search: ""})
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
      <PostsCards />
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
