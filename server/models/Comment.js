const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const commentSchema = new Schema({
    body: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'articles'}
});

const Comment = mongoose.model('comments', commentSchema); 

module.exports = {
    Comment,
    commentSchema
}