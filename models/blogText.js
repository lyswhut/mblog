var mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var AutoIncrement = require('mongoose-sequence');

var blogTextSchema = mongoose.Schema({
	title: String,
	author: String,
  commentCount: Number,
  commentReply: Number,
  commentAdCount: Number,
	date: {type:Date,default:Date.now},
	tags: [String],
	display: Boolean,
	view: Number,
  ding: [String],
  blogDesc: String,
  textType: Number,
	blogText: String,
});

// blogTextSchema.methods.getComments = function () {
// 	return Comment.find({'blogTextId' : this._id, display: true}).sort({_id: -1}).skip(0).limit(5);
// };

blogTextSchema.plugin(AutoIncrement, {inc_field: 'blogTextId'});
var BlogTextSchema = mongoose.model('BlogText', blogTextSchema);


module.exports = BlogTextSchema;