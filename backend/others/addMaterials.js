/*solved with this https://github.com/axios/axios/issues/789 from louismrose*/

var fs = require("fs");
var FormData = require("form-data");
const axios = require("axios");
var path = require("path");
var dir = "./material_images";

fs.readdir(dir, (err, files) => {

    files.forEach(file => {
        const formData = new FormData();
        filePath = path.join(dir, file);
        formData.append("sloganText", "Finally works in folder");
        formData.append("imageFile", fs.createReadStream(filePath), { knownLength: fs.statSync(filePath).size });

        const headers = {
            ...formData.getHeaders(),
            "Content-Length": formData.getLengthSync()
        };

        axios.post("http://localhost:4000/materials/", formData, {headers});
        
    })
})

