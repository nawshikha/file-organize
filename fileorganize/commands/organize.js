
function organizeFn(dirPath) {
    let destPath; 

    
    if (dirPath == undefined) {
        destPath = process.cwd(); 
        return; 
    } else {
        
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // Create a destination path for organized files
            destPath = path.join(dirPath, "organized_files");
            // Create the destination directory if it doesn't exist
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
        } else {
            
            console.log("Kindly enter the correct path");
            return; 
        }
    }

    
    organizeHelper(dirPath, destPath);
}


function organizeHelper(src, dest) {
   
    let childNames = fs.readdirSync(src);

    
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]); // Get full path of the current item
        let isFile = fs.lstatSync(childAddress).isFile(); 

        if (isFile) {
            // Get the category of the file based on its extension
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category);

            // Move the file to the appropriate category folder
            sendFiles(childAddress, dest, category);
        }
    }
}


function sendFiles(srcFilePath, dest, category) {
    // Create the category path if it doesn't exist
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath); // Create the category directory
    }

    let fileName = path.basename(srcFilePath); 
    let destFilePath = path.join(categoryPath, fileName); 
    fs.copyFileSync(srcFilePath, destFilePath); // Copy the file to the category directory
    fs.unlinkSync(srcFilePath); // Delete the original file
    console.log(fileName, "copied to ", category); 
}


function getCategory(name) {
    let ext = path.extname(name); 
    ext = ext.slice(1); // Remove the leading dot

    
    for (let type in types) {
        let cTypeArray = types[type]; 
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type; 
            }
        }
    }

    return "others"; 
}

module.exports = organizeFn;
