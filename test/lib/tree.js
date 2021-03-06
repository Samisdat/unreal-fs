'use strict';

var expect = require('chai').expect;

var Tree = require('../../lib/unreal-filesystem/tree');

describe('tree', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var tree = new Tree();

        expect(tree).to.be.instanceof(Tree);

    });

    it('resolves dirs correct', function() {

        var tree = new Tree();

        expect(tree.resolveDir('/')).to.be.equal('/');
        expect(tree.resolveDir('/foo')).to.be.equal('/foo');
        expect(tree.resolveDir('/foo/')).to.be.equal('/foo');
        expect(tree.resolveDir('/foo/bar')).to.be.equal('/foo/bar');
        expect(tree.resolveDir('/foo/bar/')).to.be.equal('/foo/bar');

        //@TODO relative path
        expect(function(){
            tree.resolveDir('./relative');
        }).to.throw('Only absolute path supported');

    });

    it('has incrementing inodeNumber', function() {

        var tree = new Tree();

        expect(tree.getLastInodeNumber()).to.be.equal(0);

        tree.addDir('/foo', true);

        expect(tree.getLastInodeNumber()).to.be.equal(1);

        tree.addDir('/foo/bar', true);

        expect(tree.getLastInodeNumber()).to.be.equal(2);

    });

    it('can add dir', function() {

        var tree = new Tree();

        expect(tree.exists('/foo')).to.be.false;
        expect(tree.exists('/foo/bar')).to.be.false;

        tree.addDir('/foo/bar', true);

        expect(tree.exists('/foo')).to.be.true;
        expect(tree.exists('/foo/bar')).to.be.true;

    });

    it('can remove dir', function() {

        var tree = new Tree();

        tree.addDir('/foo/bar', true);

        expect(tree.exists('/foo/bar')).to.be.true;

        tree.removeDir('/foo/bar');

        expect(tree.exists('/foo/bar')).to.be.false;

    });

    it('can remove dir with its children', function() {

        var tree = new Tree();

        expect(tree.tree).to.be.deep.equal({0: []});
        expect(tree.parent).to.be.deep.equal({});
        //@TODO test for leafs

        tree.addDir('/foo/bar', true);
        tree.addDir('/foo/deeper/bar', true);
        tree.addFile('/foo/bar.txt', '');
        tree.addFile('/foo/deeper/bar.txt', '');

        expect(tree.exists('/foo')).to.be.true;
        expect(tree.exists('/foo/bar')).to.be.true;
        expect(tree.exists('/foo/deeper/bar')).to.be.true;
        expect(tree.exists('/foo/bar.txt')).to.be.true;
        expect(tree.exists('/foo/deeper/bar.txt')).to.be.true;

        expect(tree.tree).to.be.deep.equal( {0: [ 1 ], 1: [ 2, 3, 5 ], 2: [], 3: [ 4, 6 ], 4: [] });
        expect(tree.parent).to.be.deep.equal( { 1: 0, 2: 1, 3: 1, 4: 3, 5: 1, 6: 3 });

        tree.removeDir('/foo');

        expect(tree.exists('/foo')).to.be.false;
        expect(tree.exists('/foo/bar')).to.be.false;
        expect(tree.exists('/foo/baz')).to.be.false;
        expect(tree.exists('/foo/deeper/bar')).to.be.false;
        expect(tree.exists('/foo/bar.txt')).to.be.false;
        expect(tree.exists('/foo/deeper/bar.txt')).to.be.false;

        expect(tree.tree).to.be.deep.equal({0: []});
        expect(tree.parent).to.be.deep.equal({});


    });

    it('can remove dir without its siblings', function() {

        var tree = new Tree();

        expect(tree.tree).to.be.deep.equal({0: []});
        expect(tree.parent).to.be.deep.equal({});
        //@TODO test for leafs

        tree.addDir('/tmp/unreal-fs', true);
        tree.addDir('/tmp/unreal-fs/exist');
        tree.addFile('/tmp/unreal-fs/message.txt', 'Hello Node.js');

        expect(tree.exists('/tmp')).to.be.true;
        expect(tree.exists('/tmp/unreal-fs')).to.be.true;
        expect(tree.exists('/tmp/unreal-fs/exist')).to.be.true;
        expect(tree.exists('/tmp/unreal-fs/message.txt')).to.be.true;

//        expect(tree.tree).to.be.deep.equal( {0: [ 1 ], 1: [ 2, 3, 5 ], 2: [], 3: [ 4, 6 ], 4: [] });
//        expect(tree.parent).to.be.deep.equal( { 1: 0, 2: 1, 3: 1, 4: 3, 5: 1, 6: 3 });

        tree.removeDir('//tmp/unreal-fs/exist');

        expect(tree.exists('/tmp')).to.be.true;
        expect(tree.exists('/tmp/unreal-fs')).to.be.true;
        expect(tree.exists('/tmp/unreal-fs/exist')).to.be.false;
        expect(tree.exists('/tmp/unreal-fs/message.txt')).to.be.true;

        //expect(tree.tree).to.be.deep.equal({0: []});
        //expect(tree.parent).to.be.deep.equal({});


    });



    it('is dir', function() {

        var tree = new Tree();

        tree.addDir('/foo', true);
        tree.addFile('/foo/bar.txt', '');

        expect(tree.exists('/foo')).to.be.true;
        expect(tree.exists('/foo/bar.txt')).to.be.true;

        expect(tree.isDirectory('/foo')).to.be.true;
        expect(tree.isDirectory('/foo/bar.txt')).to.be.false;

    });

    it('can add file', function() {

        var tree = new Tree();

        expect(tree.exists('/foo/bar.txt')).to.be.false;

        tree.addFile('/foo/bar.txt', 'foobar');

        expect(tree.exists('/foo/bar.txt')).to.be.true;

    });

    it('can remove file', function() {

        var tree = new Tree();

        tree.addFile('/foo/bar.txt', 'foobar');
        tree.addFile('/foo/baz.txt', 'foobar');

        expect(tree.exists('/foo/bar.txt')).to.be.true;
        expect(tree.exists('/foo/baz.txt')).to.be.true;

        tree.removeFile('/foo/bar.txt');

        expect(tree.exists('/foo/bar.txt')).to.be.false;
        expect(tree.exists('/foo/baz.txt')).to.be.true;

    });

    it('is file', function() {

        var tree = new Tree();

        tree.addDir('/foo', true);
        tree.addFile('/foo/bar.txt', '');

        expect(tree.exists('/foo')).to.be.true;
        expect(tree.exists('/foo/bar.txt')).to.be.true;

        expect(tree.isFile('/foo')).to.be.false;
        expect(tree.isFile('/foo/bar.txt')).to.be.true;

    });

});

