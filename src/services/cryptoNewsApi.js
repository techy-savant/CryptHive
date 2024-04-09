import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "crypto-news16.p.rapidapi.com",
};

// const baseUrl = 'https://crypto-news16.p.rapidapi.com';
const baseUrl = 'banana';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: () => createRequest(`/news/coindesk`),
        })
    })
});

export const {useGetCryptosNewsQuery} = cryptoNewsApi