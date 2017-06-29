'use strict';

import Permission from './permission';

export default class Node {

    private inodeNumber: number;
    private pathPart: string;

    protected permission: Permission

    constructor(inodeNumber: number, pathPart: string) {

        this.inodeNumber = inodeNumber;

        this.validatePath(pathPart);

        this.pathPart = pathPart;

        this.permission = new Permission('0755');

    }

    protected validatePath(pathPart: string): void{

        if(true === /[\/|\\]+/.test(pathPart)){
            throw new Error('pathPart may not contain path seperator');
        }
        
    }

    public getInodeNumber(): number {

        return this.inodeNumber;
    }

    public getPathPart(): string {

        return this.pathPart;
    }

    public setPathPart(pathPart: string): void {

        this.validatePath(pathPart);
        
        this.pathPart = pathPart;
    }

    public getContent(): string {

        return undefined;

    };

    public getPermission(): Permission {

        return this.permission;

    };

    public setPermission = function (permission: string) {

        this.permission.setMode(permission);

    };

    public isRoot(): boolean {

        return false;

    };

    public isFile(): boolean {

        return undefined;

    };

    public isDirectory(): boolean {

        return undefined;

    };

    public isBlockDevice(): boolean {

        return false;

    };

    public isCharacterDevice(): boolean {

        return false;

    };

    public isSymbolicLink(): boolean {

        return false;

    };

    public isFIFO(): boolean {

        return false;

    };

    public isSocket(): boolean {

        return false;

    };


}

