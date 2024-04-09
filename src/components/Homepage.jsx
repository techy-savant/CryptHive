import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import {Cryptocurrencies, News, Loader} from "../components";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  
  if (isFetching) return <Loader />;
  const GlobalStats = data?.data?.stats;

  const {
    total,
    total24hVolume,
    totalExchanges,
    totalMarketCap,
    totalMarkets,
  } = GlobalStats;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Metrics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={GlobalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(GlobalStats?.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(GlobalStats?.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(GlobalStats?.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(GlobalStats?.totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top-Ranking 10 Cryptocurrencies Globally
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />

    </>
  );
};

export default Homepage;
