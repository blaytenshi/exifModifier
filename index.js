const fs = require("fs");
const piexif = require("piexifjs");

// const fileName = "./images/image-2012-10-10.jpg";
// const outputFileName = "outputImage.jpg";

fs.readdir("./images", (err, files) => {
    files.forEach(file => {
        console.log("----- PROCESSING FILE > ");
        console.log(file);

        console.log("DATE IN FILENAME > ");
        const fileNameSplit = file.split('-');
        console.log("YEAR: ", fileNameSplit[1]);
        console.log("MONTH: ", fileNameSplit[2]);
        console.log("DAY: ", fileNameSplit[3]);
        console.log("Auto appending time as 12:00PM");

        const jpeg = fs.readFileSync("./images/" + file);
        const data = jpeg.toString("binary");

        const exif = {};

        exif[piexif.ExifIFD.DateTimeOriginal] =
            fileNameSplit[1] + ":" +
            fileNameSplit[2] + ":" +
            fileNameSplit[3] + "12:00:00";

        const exifObj = { "Exif": exif };
        const exifbytes = piexif.dump(exifObj);

        const newData = piexif.insert(exifbytes, data);
        const newJpeg = new Buffer(newData, "binary");
        fs.writeFileSync("./output/" + file + ".jpg", newJpeg);
        console.log("----- FILE PROCESSED");
    });
    console.log("FOLDER PROCESSED");
});