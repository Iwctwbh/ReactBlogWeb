/** @jsxImportSource @emotion/react */
import React, {ReactElement, useEffect, useState} from "react";
import {Alert, Button, Card, Input, InputNumber, Select, Space} from "antd";
import "./App.css";
import {blogPost, blogPosts} from "src/types/blogPost";
import MDEditor from "@uiw/react-md-editor";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {css, SerializedStyles} from "@emotion/react";
import {getPosts} from "./api/posts";

// element
const Blog = (): ReactElement => {
  const [postsData, setPostsData] = useState<blogPosts>();
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [needRefreshData, setNeedRefreshData] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");
  const [alertVisible, setAlertVisible] = useState(false);

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
        <Button onClick={() => {
          if (skip < 0 || take < 0) {
            setAlertVisible(true);
            return;
          }
          setAlertVisible(false);
          setNeedRefreshData(true)
        }}>
          Get Data
        </Button>
      </Space>
      {alertVisible && (
        <Alert message="请输入大于0的数。 Please enter a number greater than 0." type="error" closable
               afterClose={() => setAlertVisible(false)} />
      )}
      <div>
        <PostCards postsData={postsData} />
      </div>
    </Space>
  );
};

const PostCard = ({Title, Content}: {
  Title: string, Content: string
}): ReactElement => {
  const [cardStyle, setCardStyle] = useState<SerializedStyles>(cardMinusStyle);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(200);

  return (
    <Card
      ref={dom => setScrollHeight(dom?.scrollHeight ?? 0)}
      title={Title}
      extra={
        cardStyle == cardMinusStyle
          ?
          <PlusOutlined
            css={iconHover}
            onClick={() => {
              setCardStyle(cardPlusStyle);
              setHeight(scrollHeight);
            }}
          />
          :
          <MinusOutlined
            css={iconHover}
            onClick={() => {
              setCardStyle(cardMinusStyle);
              setHeight(200);
            }}
          />
      }
      style={{height: height}}
      css={cardStyle}
      //onClick={() => cardStyle == cardMinusStyle ? setCardStyle(cardPlusStyle) : setCardStyle(cardMinusStyle)}
    >
      <MDEditor.Markdown source={Content} />
    </Card>
  );
};

const PostCards = ({postsData}: { postsData: blogPosts | undefined }): ReactElement => {
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
const iconHover: SerializedStyles = css`
  &:hover {
    color: #252525;
  }
`;

const cardMinusStyle: SerializedStyles = css`
  text-align: left;
  width: 1000px;
  height: 200px;
  overflow: hidden;
  transition: height 0.25s linear;
`;

const cardPlusStyle: SerializedStyles = css`
  text-align: left;
  width: 1000px;
  min-height: 200px;
  overflow: hidden;
  transition: height 0.25s linear;
`;


// export
export default App;
