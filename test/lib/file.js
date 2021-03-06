'use strict';

var expect = require('chai').expect;

var File = require('../../lib/unreal-filesystem/file');

describe('file', function() {

    var file;

    beforeEach(function() {
        file = new File(1, 'test');
    });

    it('can be created', function() {

        expect(file).to.be.instanceof(File);

    });

    it('get it\'s inodenumber', function() {

        expect(file.getInodeNumber()).to.be.equal(1);

    });

    it('get/set permission', function() {

        expect(file.getPermission().getMode()).to.be.equal('0644');

        file.setPermission('0777');
        expect(file.getPermission().getMode()).to.be.equal('0777');

    });

    it('get/set it\'s name', function() {

        expect(file.getName()).to.be.equal('test');

        file.setName('foobar');
        expect(file.getName()).to.be.equal('foobar');

    });

    it('isRoot is false', function() {

        expect(file.isRoot()).to.be.false;

    });

    it('isFile is true', function() {

        expect(file.isFile()).to.be.true;

    });

    it('isDirectory is false', function() {

        expect(file.isDirectory()).to.be.false;

    });

    it('get/set content', function() {

        expect(file.getContent()).to.be.equal('');

        file.setContent('foobar');

        expect(file.getContent()).to.be.equal('foobar');

        file.setContent();

        expect(file.getContent()).to.be.equal('');

    });

});

