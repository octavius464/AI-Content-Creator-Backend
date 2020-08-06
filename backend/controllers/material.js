const Material = require('../models/material');
const mongoose = require('mongoose');

exports.get_random_materials = (req, res, next) => {
   const aggregate = Material.aggregate([{$sample: {size:8}}]);
   aggregate.exec()
   .then( docs => {
       const response = {
            message: "Successfully retrieved 8 random materials!",
            number_of_items: docs.length,
            materials: docs.map(doc => {
                return {
                    sloganText: doc.sloganText,
                    imageFile: doc.imageFile,
                    likes: doc.likes,
                    dislikes: doc.dislikes,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/materials/'+ doc._id
                    }
                }
            }
            )
       };
       if (docs.length > 0){
           res.status(200).json(response);
       }else{
           res.status(404).json({message: "No entries in the database."});
       }
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error:err});
   })
}

exports.create_new_material = (req, res, next) => {
    console.log(req.file);
    const material = new Material({
        _id: new mongoose.Types.ObjectId(),
        imageFile: req.file.path,
        sloganText: req.body.sloganText 
    });
    material
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successful added new material item!",
                createdMaterial: {
                    sloganText: result.sloganText,
                    imageFile: result.imageFile,
                    id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:4000/materials/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log("error:" + err)
            res.status(500),json({
                error: err
            });
        });      
}

exports.get_one_material = (req, res, next) => {
    const id = req.params.materialId;
    Material.findById(id)
    .exec()
    .then(doc => {
        console.log("Fetched from database:", doc);      
        if (doc){
            res.status(200).json({
                message: "Successfully retrieved this material item",
                material: {
                    sloganText: doc.sloganText,
                    imageFile: doc.imageFile,
                    likes: doc.likes,
                    dislikes: doc.dislikes,
                    id: doc._id
                },
                request: {
                    type: 'GET',
                    description: 'To obtain all material items',
                    url: req.get('host') + '/materials/'
                }
            });
        }else{
            res.status(404).json({
                message : "The ID does not exist in the database"
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
}

exports.delete_material = (req, res, next) => {
    const id = req.params.materialId;
    Material.remove({_id:id})
    .exec()
    .then(removedDoc => {
        console.log("Removed entry", removedDoc);
        res.status(200).json({removedDoc});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.update_material = (req, res, next) => {
    const id = req.params.materialID;
    const updateOps = {};
    for (const op of req.body){
        updateOps[op.propName] = op.value;
    }
    Material.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Updated Successfully!",
            request: {
                type: 'GET',
                url: 'http:localhost:4000/materials/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}