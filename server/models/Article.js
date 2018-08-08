const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const articleSchema = new Schema({
    web_url: String,
    snippet: String,
    abstract: String,
    print_page: String,
    headline: {
        main: String
    },
    keywords: [],
    pub_date: {
        full_date: String,
        year: String,
        month: String,
        day: String
    },
    document_type: String,
    word_count: Number,
    pdf_url: String
});

const Article = mongoose.model('articles', articleSchema); 

module.exports = Article; 

