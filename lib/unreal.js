var notFs = require('./unreal-methods');

var fs = require('fs');

var whitelist = {};
whitelist.Stats = true;
whitelist.access = true;
whitelist.accessSync = true;
whitelist.appendFile = true;
whitelist.appendFileSync = true;
whitelist.chmod = true;
whitelist.chmodSync = true;
whitelist.chown = true;
whitelist.chownSync = true;
whitelist.close = true;
whitelist.closeSync = true;
whitelist.createReadStream = true;
whitelist.createWriteStream = true;
whitelist.exists = true;
whitelist.existsSync = true;
whitelist.fchmod = true;
whitelist.fchmodSync = true;
whitelist.fchown = true;
whitelist.fchownSync = true;
whitelist.fdatasync = true;
whitelist.fdatasyncSync = true;
whitelist.fstat = true;
whitelist.fstatSync = true;
whitelist.fsync = true;
whitelist.fsyncSync = true;
whitelist.ftruncate = true;
whitelist.ftruncateSync = true;
whitelist.futimes = true;
whitelist.futimesSync = true;
whitelist.lchmod = true;
whitelist.lchmodSync = true;
whitelist.lchown = true;
whitelist.lchownSync = true;
whitelist.link = true;
whitelist.linkSync = true;
whitelist.lstat = true;
whitelist.lstatSync = true;
whitelist.mkdir = true;
whitelist.mkdirSync = true;
whitelist.open = true;
whitelist.openSync = true;
whitelist.read = true;
whitelist.readdir = true;
whitelist.readdirSync = true;
whitelist.readFile = true;
whitelist.readFileSync = true;
whitelist.readlink = true;
whitelist.readlinkSync = true;
whitelist.realpath = true;
whitelist.readSync = true;
whitelist.realpathSync = true;
whitelist.rename = true;
whitelist.renameSync = true;
whitelist.rmdir = true;
whitelist.rmdirSync = true;
whitelist.stat = true;
whitelist.statSync = true;
whitelist.symlink = true;
whitelist.symlinkSync = true;
whitelist.truncate = true;
whitelist.truncateSync = true;
whitelist.unlink = true;
whitelist.unlinkSync = true;
whitelist.unwatchFile = true;
whitelist.utimes = true;
whitelist.utimesSync = true;
whitelist.watch = true;
whitelist.watchFile = true;
whitelist.write = true;
whitelist.write = true;
whitelist.writeFile = true;
whitelist.writeFileSync = true;
whitelist.writeSync = true;
whitelist.writeSync = true;

var orginal = {};

for(var method in fs){
    if(undefined !== notFs[method] && true === whitelist[method]){
        orginal[method] = fs[method];
        //fs[method] = notFs[method].bind(this);
    }
}

notFs.swapIn = function(){

    for(var method in fs){
        if(undefined !== notFs[method] && true === whitelist[method]){
            fs[method] = notFs[method].bind(this);
        }
    }

};

notFs.swapOut = function(){
    for(var method in fs){
        if(undefined !== notFs[method] && true === whitelist[method]){
            fs[method] = orginal[method].bind(this);
        }
    }

};

notFs.copyFromFs = function(path, swap){
    if(undefined === swap){
        swap = false;
    }

    if(true === swap){
        notFs.swapOut();    
    }
    
    var copyFiles = {};

    var files = orginal.readdirSync(path);

    var read = orginal.readFileSync.bind(this);

    files.forEach(function(file){
        notFs.writeFileSync(path + file, read(path + file, {encoding: 'utf8'}));
    });  

    if(true === swap){
        notFs.swapIn();
    }

};

module.exports = notFs;