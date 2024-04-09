import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { Loader } from "../components";

import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery();

  if (!cryptoNews) return <Loader />;

  const filterData = () => {
    if (simplified) return cryptoNews.slice(0, 6);
    return cryptoNews.slice(0, 15);
  };

  const filteredNews = filterData();

  return (
    <Row gutter={[24, 24]}>
      {filteredNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                  style={{ maxWidth: "180px", maxHeight: "120px" }}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <Text>{moment(news.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
