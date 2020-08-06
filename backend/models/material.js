import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sloganText: {type:String, required: true},
    imageFile: {type:String, required: true},
    likes: {type: Number, required:false, default:1},
    dislikes: {type: Number, required:false, default:1}
});

module.exports = mongoose.model("Material", materialSchema);

