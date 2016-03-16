'use strict';

var mocha = {
    options: {
        reporter: 'spec',
        captureFile: 'results.txt', // Optionally capture the reporter output to a file
        quiet: false, // Optionally suppress output to standard out (defaults to false)
        clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
    },
    src: [
        'test/tree/node.js',
        'test/tree/root.js',
        'test/tree/file.js',
        'test/tree/dir.js',
        'test/tree/fstree.js'        
    ]
};

module.exports = mocha;
