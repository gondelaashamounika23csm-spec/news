const express = require('express');
const axios = require('axios');
const newsr = express.Router();
const moment = require('moment');

// Valid categories for NewsAPI
const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

// Home route - Top headlines India
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

// Category route with fallback
newsr.get('/:category', async (req, res) => {
  let category = req.params.category.toLowerCase();

  // Validate category
  if (!validCategories.includes(category)) {
    category = 'general'; // fallback for invalid category
  }

  try {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=36f3e29b704f41339af8439dc1228334`;
    let news_get = await axios.get(url);

    // Fallback if no articles returned
    if (news_get.data.articles.length === 0) {
      console.log(`No articles found for ${category}, using general news fallback`);
      url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=36f3e29b704f41339af8439dc1228334`;
      news_get = await axios.get(url);
    }

    res.render('news', { articles: news_get.data.articles });

  } catch (error) {
    console.log(error);
    res.render('news', { articles: [] });
  }
});

module.exports = newsr;
