import React, { useState, useRef, useEffect } from "react";

import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import {Loader} from '../components';

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="search-crypto">
        {!simplified && (
          <Input
            placeholder="Search desired Crypto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        )}
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
