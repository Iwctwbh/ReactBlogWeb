/** @jsxImportSource @emotion/react */
import React, {ReactElement, useEffect, useState} from "react";
import {Button, Card, InputNumber, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor from "@uiw/react-md-editor";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {css, SerializedStyles} from "@emotion/react";

// element
const PostsCards = (): ReactElement => {
  console.log("PostsCards is calling");
  const [postsData, setPostsData] = useState<blogPosts>();
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [needRefreshData, setNeedRefreshData] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setNeedRefreshData(false);
      await fetch("http://10.11.12.30:5232/GetPosts",
        {
          method: "Post",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({skip: skip, take: take, order: "asc", search: ""})
        })
        .then((response) => response.json())
        .then((jsonResult: blogPosts) => setPostsData(jsonResult));
    })();
  }, [needRefreshData]);

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
        <ListPosts postsData={postsData} />
      </div>
    </>
  );
};

const PostCard = ({Title, Content}: {
  Title: string, Content: string
}): ReactElement => {
  console.log("PostCard is calling");
  const [cardStyle, setCardStyle] = useState<SerializedStyles>(cardMinusStyle);

  return (
    <Card
      title={Title}
      extra={
        <div>
          {
            cardStyle == cardMinusStyle
              ?
              <PlusOutlined
                css={iconHover}
                onClick={() => setCardStyle(cardPlusStyle)}
              />
              :
              <MinusOutlined
                css={iconHover}
                onClick={() => setCardStyle(cardMinusStyle)}
              />
          }
        </div>
      }
      css={cardStyle}
      //onClick={() => cardStyle == cardMinusStyle ? setCardStyle(cardPlusStyle) : setCardStyle(cardMinusStyle)}
    >
      <MDEditor.Markdown source={Content} />
    </Card>
  );
};

const ListPosts = ({postsData}: { postsData: blogPosts | undefined }): ReactElement => {
  console.log("ListPosts is calling");
  return (
    <Space direction="vertical" size={16}>
      {postsData?.data.map((m: blogPost) => {
        return (
          <PostCard key={m.Id} Title={m.Title} Content={m.Content}></PostCard>
        );
      })}
    </Space>
  );
};

// App
const App = (): ReactElement => {
  return (
    <div className="App">
      <PostsCards />
    </div>
  );
};

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
  max-width: 1000px;
  min-height: 200px;
  height: 100%;
  overflow: unset;
`;


// export
export default App;
