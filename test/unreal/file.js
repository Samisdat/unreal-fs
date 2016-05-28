'use strict';

var expect = require('chai').expect;

var Root = require('../../lib/unreal-filesystem/root');
var Dir = require('../../lib/unreal-filesystem/dir');
var File = require('../../lib/unreal-filesystem/file');

describe('file', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var file = new File('test');

        expect(file).to.be.instanceof(File);

    });
    it('returns it\'s inodenumber', function() {

        var file = new File('test');
        expect(file.getInodeNumber()).to.be.not.undefined;

    });

    it('get/set permission', function() {

        var file = new File('test');

        expect(file.getPermission().getMode()).to.be.equal('0644');

    });

    it('returns it\'s name', function() {

        var file = new File('test');

        expect(file.getName()).to.be.equal('test');

    });

    it('isFile is true', function() {

        var file = new File('test');

        expect(file.isFile()).to.be.true;

    });

    it('isDir is false', function() {

        var file = new File('test');

        expect(file.isDir()).to.be.false;

    });

    it('get/set content', function() {

        var root = new Root('root');

        var file = new File('test');

        expect(file.getContent()).to.be.equal('');

        file.setContent('foobar');

        expect(file.getContent()).to.be.equal('foobar');

        var file = new File('test', root, 'bar', {});

        expect(file.getContent()).to.be.equal('bar');

    });    

    it('returns it\'s full qualified name and depth', function() {

        var root = new Root('root');

        expect(root.getFqn()).to.be.false;

        var parent = new Dir('parent', root);
        expect(parent.getFqn()).to.be.equal('/parent');
        expect(parent.getDepth()).to.be.equal(1);

        var node = new File('child', parent);

        expect(node.getFqn()).to.be.equal('/parent/child');
        expect(node.getDepth()).to.be.equal(2);

        var orphan = new File('orphan');
        expect(orphan.getFqn()).to.be.false;

    });

    it('returns undefined parent', function() {

        var node = new File('test');

        expect(node.getParent()).to.be.undefined;

    });

    it('returns it\'s parent', function() {

        var parent = new Dir('parent');

        var node = new File('test', parent);

        expect(node.getParent()).to.deep.equal(parent);

        var node = new File('test');

        expect(node.getParent()).to.be.undefined;

        node.setParent(parent);

        expect(node.getParent()).to.deep.equal(parent);

    });

});
