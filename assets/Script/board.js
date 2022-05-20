const ROWS = 4;
const NUMBERS = [2, 4];
const V = require("Variables");
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBlocksLayout', this);   
    },

    start() {
        this.createBlocksLayout()
        this.gameInit();
    },
    createdBlock(width, height, x,y, label ) {
        let block = cc.instantiate(this.blockPrefab);
        block.width = width;
        block.height = height;
        block.parent = this.node
        block.setPosition(cc.v2(x, y));
        block.getComponent('block').setLabel(label)
        return block;
    },  
    createBlocksLayout() {
        let y = 250;
        let distance = 20
        let size = 150
        for (let row = 0; row < 4; row++) {
            V.positions.push([0, 0, 0, 0]);
            let x = -250
            for (let col = 0; col < V.cols; col++) {
                this.createdBlock(size,size,x,y,0)
                V.positions[row][col] = cc.v2(x, y);
                x += distance + size ;
            }
            y -= distance + size
        }
    }, 


    getEmptyLocations() {
        let emptyLocations = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (V.blocks[row][col] == null) {
                    emptyLocations.push({
                        x: row,
                        y: col
                    });
                }
            }
        }
        return emptyLocations;
    },
    createArray2D(row, col,value) {
        let arr = new Array()
        for (let i = 0; i < row; i++) {
            arr[i] = new Array()
            for (let j = 0; j < col; j++) {
                arr[i][j] = value
            }
        }
        return arr
    },
    gameInit() {
        console.log("new Game");
        V.blocks =this.createArray2D(4,4,null)
        V.data =this.createArray2D(4,4,0)
        // V.blocks = [];
        // V.data = [];
        // for (let i = 0; i < ROWS; i++) {
        //     V.blocks.push([null, null, null, null]);
        //     V.data.push([0, 0, 0, 0]);
        // }

        this.randomBlock()
        this.randomBlock()
        console.log(V.data);
        console.log(V.blocks);
    },
    randomBlock() {
        let emptyLocations = this.getEmptyLocations();
        if (emptyLocations == "") {
            return
        }
        let locationRandom = emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
        let x = locationRandom.x;
        let y = locationRandom.y;
        let size = 150
        let numberRandom = V.numbers[Math.floor(Math.random() * V.numbers.length)];
        let block = this.createdBlock(size,size,V.positions[x][y].x,V.positions[x][y].y,numberRandom)
        V.blocks[x][y] = block;
        V.data[x][y] = numberRandom;
        return true;
    },
    afterMove(hasMoved) {
        if (hasMoved) {
            // this.updateScore(this.score+1);
            this.randomBlock();            
        }
        // if (this.checkFail()) {
        //     this.gameOver();
        // }
    },
    doMove(block, position, callback) {
        let action = cc.moveTo(0.1, position);
        let finish = cc.callFunc(()=>{
            callback && callback()
        });
        block.runAction(cc.sequence(action, finish));
    },
    doMerge(b1, b2, num, callback) {
        b1.destroy(); 
        let scale1 = cc.scaleTo(0.1, 1.1);
        let scale2 = cc.scaleTo(0.1, 1);
        let mid = cc.callFunc(()=>{
            b2.getComponent('block').setLabel(num);
        });
        let finished = cc.callFunc(()=>{ 
            callback && callback() 
        });
        b2.runAction(cc.sequence(scale1, mid, scale2, finished));
    },
    inputRight() {
        let nodesToMove = this.getNodeToMove()
        
        for (let i = nodesToMove.length-1 ; i >= 0; i--) {  
            // console.log(nodesToMove[i]);
            let actions = [ cc.callFunc( ()=> {this.moveRight(nodesToMove[i].x, nodesToMove[i].y)}),
                            // cc.callFunc( ()=> {this.merge}), 

                            cc.callFunc( ()=> {this.isMerged = false}),
                            cc.delayTime(0.1), 
                            cc.callFunc( ( )=> {
                                if (i == 0)  {
                                    console.log("randomBlock");
                                    this.randomBlock()
                                }
                            })]
            this.node.runAction(cc.sequence(actions))
        }      
    },
    inputUp() {

        let hasMoved = false;
        console.log("Down");
        let move = (x, y, callback) => {
            if (x == 0 || V.data[x][y] == 0) {
                callback && callback();
                return;
            } else if (V.data[x-1][y] == 0) {
                // 移动
                let block = V.blocks[x][y];
                let position = V.positions[x-1][y];
                V.blocks[x-1][y] = block;
                V.data[x-1][y] = V.data[x][y];
                V.data[x][y] = 0;
                V.blocks[x][y] = null;
                this.doMove(block, position, ()=>{
                    move(x-1, y, callback);
                });
                hasMoved = true;
            } else if (V.data[x-1][y] == V.data[x][y]) {
                // 合并
                let block = V.blocks[x][y];
                let position = V.positions[x-1][y];
                V.data[x-1][y] *= 2;
                V.data[x][y] = 0;
                V.blocks[x][y] = null;
                this.doMove(block, position, ()=>{
                    this.doMerge(block, V.blocks[x-1][y], V.data[x-1][y], ()=>{
                        callback && callback();
                    });
                });
                hasMoved = true;
            } else {
                callback && callback();
                return;
            }
        };

        let toMove = [];
        for (let i=0; i<ROWS; ++i) {
            for (let j=0; j<ROWS; ++j) {
                if (V.data[i][j] != 0) {
                    toMove.push({x: i, y: j});
                }
            }
        }

        let counter = 0;
        for (let i=0; i<toMove.length; ++i) {
            move(toMove[i].x, toMove[i].y, ()=>{
                counter++;
                if (counter == toMove.length) {
                    this.afterMove(hasMoved);
                }
            });
        }  
    },
    moveDown(row,col) {
        // let move = (x, y, callback) => {
            if (row == ROWS-1 || V.data[row][col] == 0) {
                callback && callback();
                return;
            } else 
            if (V.data[row+1][col] == 0) {
                // 移动
                let block = V.blocks[row][col];
                let position = V.positions[x+1][y];
                V.blocks[x+1][y] = block;
                V.data[x+1][y] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                this.doMove(block, position, ()=>{
                    move(x+1, y, callback);
                });
                hasMoved = true;
            } else if (V.data[x+1][y] == V.data[row][col]) {
                // 合并
                let block = V.blocks[row][col];
                let position = V.positions[x+1][y];
                V.data[x+1][y] *= 2;
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                this.doMove(block, position, ()=>{
                    this.doMerge(block, V.blocks[x+1][y], V.data[x+1][y], ()=>{
                        callback && callback();
                    });
                });
                hasMoved = true;
            } else {
                callback && callback();
                return;
            }
        // };
    },
    inputDown() {
        cc.log('move up');

        let hasMoved = false;


        let toMove = [];
        for (let i=ROWS-1; i>=0; --i) {
            for (let j=0; j<ROWS; ++j) {
                if (V.data[i][j] != 0) {
                    toMove.push({x: i, y: j});
                }
            } 
        }

        let counter = 0;
        for (let i=0; i<toMove.length; ++i) {
           this.move(toMove[i].x, toMove[i].y, ()=>{
                counter++;
                if (counter == toMove.length) {
                    this.afterMove(hasMoved);
                }
            });
        }        
    },
    // moveRight(row,col = 0) {
    //     let noteToMove = this.getNodeToMove()
    //     console.log(noteToMove);
    //     console.log("Move right");
    //     let isZero = true
    //     for (let index = 0; index < V.data[row].length; index++) {
    //         if (V.data[row][index] != 0) {
    //             isZero = false
    //         }
    //     }
    //     if (isZero) {
    //         return
    //     }
    //     if (V.data[row][col] == 0) {
    //         this.moveRight(row, col + 1 );
    //         return;
    //     }
    //     if (col == 0) {
    //         if (V.data[row][3] == 0) {
    //             this.moveRight(row, 3);
    //             this.updateBlockNum();
    //         }   
    //         if (V.data[row][1] != 0 && V.data[row][3] !=0 && V.data[row][2] == 0) {
    //             this.moveRight(row, 3);
    //             this.updateBlockNum();
    //         }
    //         if (this._flag) {
    //             // this.mergeBlock(row,"Right")
    //         }

    //         return
    //     }
    //     if (V.data[row][col+1] == 0) {
    //         V.blocks[row][col+1] = V.blocks[row][col];;
    //         let block = V.blocks[row][col]
    //         // V.positions[row][col] = V.positions[row][col-1]
    //         V.data[row][col+1] = V.data[row][col];
    //         V.data[row][col] = 0;
    //         console.log(V.positions[row][col])
    //         // this.moveNode(block,position)
    //         V.blocks[row][col] = null;
    //         this.updateBlockNum();


    //     }
    //     this.moveRight(row, col + 1);
    //     this.updateBlockNum();
    // },
    getNodeToMove(){
        let nodesToMove = [];
        // console.log(V.data);
        for (let row=0; row<4; row++) {
            for (let col=0; col< 4; col++) {
                if (V.data[row][col] != 0) {
                    nodesToMove.push({x: row, y: col});
                }
            }
        }
        return nodesToMove
    },






    // checkWin() {
    //     for (let i = 0; i < 4; i++) {
    //         for (let j = 0; j < 4; j++) {
    //             if (V.data[i][j] == 2048) {
    //                 cc.log("Win Game");
    //                 return;
    //             }
    //         }
    //     }
    //     cc.log("Continoun");
    // },
    // checkLose() {
    //     for (let i = 0; i < ROWS; i++) {
    //         for (let j = 0; j < ROWS; j++) {

    //             if (i == 3 && j < 3) {
    //                 if (V.data[i][j] == V.data[i][j+1]) {
    //                     cc.log("Con choi dc");
    //                     return;
    //                 }
    //             } else if (j == 3) {
    //                 if (i < 3) {
    //                     if (V.data[i][j] == V.data[i+1][j]) {
    //                         cc.log("Con choi dc");
    //                         return;
    //                     }
    //                 }

    //             }
    //             else if (V.data[i][j] == V.data[i][j] ||
    //                 V.data[i][j] == V.data[i][j]) {
    //                 cc.log("Con choi dc");
    //                 return;
    //             }


    //         }
    //     }
    //     cc.log("LOSE GAME");
    // },

    updateBlockNum: function () {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (V.blocks[row][col] != null ) {
                    console.log(V.blocks[row][col].getComponent('block').setLabel(4));
                    // console.log(V.data[row][col]);
                    // console.log(V.blocks[row][col]);
                    console.log(row, col);
                    V.blocks[row][col].getComponent('block').setLabel(V.data[row][col])
                }
                // this.setLabel()
            }
        }
    },
});
