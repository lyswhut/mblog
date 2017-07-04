var mongoose = require('mongoose');
// var AutoIncrement = require('mongoose-sequence');


var commentSchema = mongoose.Schema({
	blogTextId: String,
	vertical: Number,
	horizontal: [Number],
	display: Boolean,
	authorType: String,
	authorName: String,
	authorEmail: String,
	authorImgUrl: String,
	authorIp: String,
	date: {type:Date,default:Date.now},
	floor: Number,
	ding: [String],
	comment: String,
	userAgent: String,
	replyComment: [],
});

// var replyCommentSchema = mongoose.Schema({
// 	blogTextId: String,
//   parentId: Number,
//   horizontal: [],
//   vertical: Number,
//   display: Boolean,
//   authorType: String,
//   authorName: String,
//   authorImgUrl: String,
//   authorIp: String,
//   date: Date,
//   ding: Number,
//   comment: String,
//   userAgent: String,
//   replyComment: [],
// });


// commentSchema.methods.getDisplayPrice = function () {
// 	return '$' + (this.priceInCents / 100).toFixed(2);
// };

// commentSchema.plugin(AutoIncrement, {inc_field: 'commentId'});
// replyCommentSchema.plugin(AutoIncrement, {inc_field: 'replyCommentId'});

var Comment = mongoose.model('Comment', commentSchema);
// var ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);

module.exports = Comment;
// exports.ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);


//数据库是:
// {
// 	"__v": 1,
// 	"_id": "538f5f0f6195a184108c8bd8",
// 	"title": "GameTitle",
// 	"item":
// 	[{
// 		"_id": "538f5f0f6195a184108c8bd6",
// 		"name": "itemOne",
// 		"men":
// 		[{
// 			"_id": "5390cccf0a84f41f37082874",
// 			"user": "id22222222",
// 			"score": 2000
// 		},

// 		{
// 			"_id": "2390cccf0a84f41f37082873",
// 			"user": "id33333333",
// 			"score": 1000
// 		}]
// 	},

// 	{
// 		"_id": "538f5f0f6195a184108c8bd7",
// 		"name": "itemTwo",
// 		"men": []
// 	}],
// 	"status": 1
// }
// //代码是:
// var MenSchema = new mongoose.Schema({
// 	user: 'String',
// 	score: {
// 		type: Number,
// 		default: 0
// 	}
// });
// var ItemsSchema = new mongoose.Schema({
// 	name: String,
// 	men: [MenSchema]
// });
// ListsSchema = new mongoose.Schema({
// 	title: {
// 		type: String,
// 		required: true
// 	},
// 	item: [ItemsSchema]
// });
// var Items = mongoose.model('item', ItemsSchema);
// var Lists = mongoose.model('lists', ListsSchema);
// var Men = mongoose.model('men', MenSchema);
// Insert and update: function commit(sId, sItem, sUser, sIncreaseScore) {
// 	Lists.findOne({,
// 		"_id": sId,
// 		"item.name": sItem
// 	}, null, function(err, documents) {
// 		if (!err) {
// 			if (documents != null) {
// 				Lists.findOne({
// 					"_id": sId,
// 					"item.name": sItem,
// 					"item.men.user": sUser
// 				}, null, function(err, subDoc) {
// 					if (!err) {
// 						if (subDoc != null) {
// 							//increase user score //!!!!!!!!!!!!!But subDoc will get all arrays of item.men, so I can't update it correctly 
// 						} else { //inser new user score 
// 							var userData = new Men({
// 								user: sUser,
// 								score: sScore
// 							});
// 							documents.item[0].men.push(userData);
// 							documents.save(function(err) {
// 								if (!err) { ///!!!!!!!!!!!!!!Will come this 
// 									console.log("documents error on save!");
// 								} else {
// 									console.log("save documents ok!");
// 								}
// 							});
// 						}
// 					}
// 				});
// 			}
// 		} else {
// 			console.log("not find the game item!");
// 		}
// 	});
// }