const fs = require('fs'); // Import the File System module for file and directory operations
let path = require("path"); // Import the path module to handle and manipulate file paths


function treeFn(dirPath) {
    // If no path is provided, use the current working directory
    if (dirPath == undefined) {
        treeHelper(process.cwd(), ""); // Call treeHelper with the current working directory
        return; 
    } else {
        
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            
            treeHelper(dirPath, "");
        } else {
            
            console.log("Kindly enter the correct path");
            return; 
        }
    }
}


function treeHelper(dirPath, indent) {
    // Check if the current path is a file
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        // If it is a file, get the file name and print it with indentation
        let fileName = path.basename(dirPath); 
        console.log(indent + "├──" + fileName);
    } else {
        // If it is a directory, get the directory name and print it
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        
        // Read the contents of the directory
        let childrens = fs.readdirSync(dirPath);
        // Iterate through each item in the directory
        for (let i = 0; i < childrens.length; i++) {
            // Create the full path for each child item
            let childPath = path.join(dirPath, childrens[i]);
            // Recursively call treeHelper for each child item, increasing indentation
            treeHelper(childPath, indent + "\t");
        }
    }
}


module.exports = treeFn;
