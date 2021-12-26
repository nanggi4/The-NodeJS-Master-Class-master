/*
 * Library for string and editing data
 */

const fs = require('fs');
const path = require('path');

const lib = {};

// Base dir
lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if(!err && fileDescriptor) {
      const stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if(!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err, data) => {
    callback(err, data);
  });
};

module.exports = lib;
