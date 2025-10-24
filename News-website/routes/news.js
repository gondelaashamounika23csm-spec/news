const express = require('express');
const axios = require('axios');
const newsr = express.Router();
const moment = require('moment');

// Home route - Top headlines for India
newsr.get('/', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    console.log(error);
    res.render('news', { articles: [] });
  }
});

// Search route
newsr.post('/search', async (req, res) => {
  const search = req.body.search;
  try {
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    console.log(error);
    res.render('news', { articles: [] });
  }
});

// Category route
newsr.get('/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();

  // Valid categories for NewsAPI
  const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  if (!validCategories.includes(category)) {
    // Invalid category - show empty
    return res.render('news', { articles: [] });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=36f3e29b704f41339af8439dc1228334`;
    const news_get = await axios.get(url);
    res.render('news', { articles: news_get.data.articles });
  } catch (error) {
    console.log(error);
    res.render('news', { articles: [] });
  }
});

module.exports = newsr;
