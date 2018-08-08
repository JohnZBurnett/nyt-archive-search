const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const articleSchema = new Schema({
    web_url: String,
    snipped: String,
    abstract: String,
    print_page: String,
    headline: {
        main: String
    },
    keywords: [],
    pub_date: String,
    document_type: String,
    word_count: Number,
    pdf_url: String
})

const Article = mongoose.model('articles', articleSchema); 

module.exports = Article; 

