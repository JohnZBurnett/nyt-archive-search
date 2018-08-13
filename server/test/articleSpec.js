const mongoose = require('mongoose'); 
const should = require('chai').should(); 
const Article = require('../models/Article').Article;
const keys = require('../config/keys');

before( (done) => {
    mongoose.connect(keys.MONGO_TEST_URI);
    mongoose.connection
      .on('error', (error) => {
          console.warn('Error', error);
      });
      done(); 
})

beforeEach( async () => {
    await new Article({
        web_url: "test_url",
        snippet: "This is a test snippet",
        abstract: "This is a test abstract",
        print_page: "This is a test print page",
        headline: {
            main: "This is a test headline"
        },
        keywords: [],
        pub_date: {
            full_date: "YYYY-MM-DD",
            year: "YYYY",
            month: "MM",
            day: "DD"
        },
        document_type: "PDF",
        word_count: "9001",
        pdf_url: "This is a PDF URL"
    }).save();
})

describe('Getting an article from the DB', () => {
    it('finds an article based on title', async () => {
        let articleResults = await Article.find({
            "snippet": "This is a test snippet"
        });
       return articleResults.length.should.equal(1);
    })
})

afterEach( (done) => {
    mongoose.connection.collections.articles.drop();
    done(); 
})

mongoose.connection.close();