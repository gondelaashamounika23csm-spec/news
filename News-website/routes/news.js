const express = require('express');
const axios = require('axios');
const newsr = express.Router();
const moment = require('moment');
const math = require('math');

newsr.get('/', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    if (error.response) console.log(error);
  }
});

newsr.post('/search', async (req, res) => {
  const search = req.body.search;
  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    if (error.response) console.log(error);
  }
});

newsr.get('/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    if (error.response) console.log(error);
  }
});

module.exports = newsr;
