/** @jsxImportSource @emotion/react */
import React, {ReactElement, useEffect, useState} from "react";
import {Button, Card, Input, InputNumber, Select, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor from "@uiw/react-md-editor";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {css, SerializedStyles} from "@emotion/react";
import {getPosts} from "./api/posts";

// element
const Blog = (): ReactElement => {
  console.log("Blog is calling");
  const [postsData, setPostsData] = useState<blogPosts>();
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [needRefreshData, setNeedRefreshData] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");

  useEffect(() => {
    (async () => {
      setNeedRefreshData(false);
      await getPosts(JSON.stringify({
        skip: skip,
        take: take,
        order: order,
        search: search
      })).then((jsonResult: blogPosts) => setPostsData(jsonResult));
    })();
  }, [needRefreshData]);

  return (
    <Space direction="vertical" size={16}>
      <Space size={16}>
        skip:
        <InputNumber
          defaultValue={skip}
          onChange={(v: number | null) => setSkip(v ?? 0)}
          onPressEnter={(e) => e.key === "Enter" ? setNeedRefreshData(true) : null}
        />
        take:
        <InputNumber
          defaultValue={take}
          onChange={(v: number | null) => setTake(v ?? 10)}
          onPressEnter={(e) => e.key === "Enter" ? setNeedRefreshData(true) : null}
        />
        search:
        <Input
          defaultValue={search}
          placeholder="search value"
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={(e) => e.key === "Enter" ? setNeedRefreshData(true) : null}
        />
        <Select
          defaultValue={order}
          style={{width: 70}}
          onChange={(v: string) => setOrder(v)}
          options={[
            {value: "desc", label: "desc"},
            {value: "asc", label: "asc"}
          ]}
        />
        <Button onClick={() => setNeedRefreshData(true)}>
          Get Data
        </Button>
      </Space>
      <div>
        <PostCards postsData={postsData} />
      </div>
    </Space>
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
      css={cardStyle}
      //onClick={() => cardStyle == cardMinusStyle ? setCardStyle(cardPlusStyle) : setCardStyle(cardMinusStyle)}
    >
      <MDEditor.Markdown source={Content} />
    </Card>
  );
};

const PostCards = ({postsData}: { postsData: blogPosts | undefined }): ReactElement => {
  console.log("PostCards is calling");
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
      <Blog />
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
  width: 1000px;
  height: 200px;
  overflow: hidden;
`;

const cardPlusStyle = css`
  width: 1000px;
  min-height: 200px;
  height: 100%;
  overflow: unset;
`;


// export
export default App;
