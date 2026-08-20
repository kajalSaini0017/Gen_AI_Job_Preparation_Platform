const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true, "token is required for add tokenBlacklist"]
    }

},{
    timestamps : true
})

tokenBlacklistSchema.index({createdAt : 1},{
    expireAfterSeconds : 60 * 60 * 24 * 3
})

const tokenBlackListModel = mongoose.model('tokenBlacklist',tokenBlacklistSchema);

module.exports = tokenBlackListModel;