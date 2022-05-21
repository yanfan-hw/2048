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
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.emit('transBlocksLayout', this);
    },

    start() {
        this.createBlocksLayout()
        this.gameInit();
    },
    countScore() {
        // let extra = Variables.scoreExtra
        if (V.scoreExtra == 0) {
            return
        }
        V.scoreGame += V.scoreExtra
        let userData = new Object()
        userData.score = V.scoreGame
        userData.moveStep = 10

        let bestScore = V.bestScore.loadBestScore()
        console.log(bestScore.score);
        if (userData.score > bestScore.score) {
            console.log("save bestScore :", userData.score);
            V.bestScore.saveBestScore(userData)
            V.bestScore.loadBestScore()
        }
        V.score.updateExtraScore(V.scoreExtra)
        V.score.updateScore(V.scoreGame)
        V.scoreExtra = 0
    },
    createdBlock(width, height, x, y, label) {
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
                this.createdBlock(size, size, x, y, 0)
                V.positions[row][col] = cc.v2(x, y);
                x += distance + size;
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
    createArray2D(row, col, value) {
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
        V.blocks = this.createArray2D(4, 4, null)
        V.data = this.createArray2D(4, 4, 0)
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
        let block = this.createdBlock(size, size, V.positions[x][y].x, V.positions[x][y].y, numberRandom)
        V.blocks[x][y] = block;
        V.data[x][y] = numberRandom;
        return true;
    },
    afterMove(hasMoved) {
        // if (hasMoved) {
        //     // this.updateScore(this.score+1);
        //     this.countScore()
        //     this.randomBlock();            
        // }
        this.countScore()
        this.randomBlock();
        // if (this.checkFail()) {
        //     this.gameOver();
        // }
    },
    moveNode(block, position, callback) {
        let actions = [cc.moveTo(0.05, position), cc.callFunc(() => { callback() })]
        block.runAction(cc.sequence(actions));
    },
    mergeNode(block, blockTarget, label, callback) {
        block.destroy();
        let actions = [cc.scaleTo(0.05, 1.1), cc.scaleTo(0.05, 1), cc.callFunc(() => {
            blockTarget.getComponent('block').setLabel(label)
        }), cc.callFunc(() => { callback() })]
        blockTarget.runAction(cc.sequence(actions));
    },
    inputRight() {
        let nodesToMove = this.getNodeToMove()

        for (let i = nodesToMove.length - 1; i >= 0; i--) {
            // console.log(nodesToMove[i]);
            let actions = [cc.callFunc(() => { this.moveRight(nodesToMove[i].x, nodesToMove[i].y) }),
            // cc.callFunc( ()=> {this.merge}), 

            cc.callFunc(() => { this.isMerged = false }),
            cc.delayTime(0.1),
            cc.callFunc(() => {
                if (i == 0) {
                    console.log("randomBlock");
                    this.randomBlock()
                }
            })]
            this.node.runAction(cc.sequence(actions))
        }
    },
    moveLeft(row, col, callback) {
        let hasMoved = false;
        if (col == 0 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row][col - 1] == 0) {
            // 移动
            let block = V.blocks[row][col];
            let position = V.positions[row][col - 1];
            V.blocks[row][col - 1] = block;
            V.data[row][col - 1] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.moveLeft(row, col - 1, callback);
            });
            hasMoved = true;
        } else if (V.data[row][col - 1] == V.data[row][col]) {
            // 合并
            let block = V.blocks[row][col];
            let position = V.positions[row][col - 1];
            V.data[row][col - 1] *= 2;
            V.scoreExtra += V.data[row][col - 1]
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.mergeNode(block, V.blocks[row][col - 1], V.data[row][col - 1], () => {
                    callback();
                });
            });
            hasMoved = true;
        } else {
            callback();
            return;
        }
    },
    moveRight(row, col, callback) {
        let hasMoved = true;
        if (col == V.rows - 1 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row][col + 1] == 0) {
            // 移动
            let block = V.blocks[row][col];
            let position = V.positions[row][col + 1] ;
            V.blocks[row][col + 1]  = block;
            V.data[row][col + 1]  = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.moveRight(row, col + 1, callback);
            });
            hasMoved = true;
        } else if (V.data[row][col + 1]  == V.data[row][col]) {
            // 合并
            let block = V.blocks[row][col];
            let position = V.positions[row][col + 1] ;
            V.data[row][col + 1]  *= 2;
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.mergeNode(block, V.blocks[row][col + 1] , V.data[row][col + 1] , () => {
                     callback();
                });
            });
            hasMoved = true;
        } else {
            callback();
            return;
        }
    },
    inputRight() {
        cc.log('move right');
        let hasMoved = true;
        let getNodeToMove = [];
        for (let row = 0; row < V.rows; row++) {
            for (let col = V.rows - 1; col >= 0; col--) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }

        let counter = 0;
        for (let i = 0; i < getNodeToMove.length; ++i) {
            this.moveRight(getNodeToMove[i].x, getNodeToMove[i].y, () => {
                counter++;
                this.checkCounter(counter, getNodeToMove, hasMoved)
            });
        }
    },
    inputLeft() {
        cc.log('move left');
        let hasMoved = true;
        let getNodeToMove = [];
        for (let row = 0; row < V.rows; ++row) {
            for (let col = 0; col < V.rows; ++col) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        console.log(getNodeToMove);

        let counter = 0;
        for (let i = 0; i < getNodeToMove.length; ++i) {
            this.moveLeft(getNodeToMove[i].x, getNodeToMove[i].y, () => {
                counter++;
                // if (counter == getNodeToMove.length) {
                //     this.afterMove(hasMoved);
                // }
                this.checkCounter(counter, getNodeToMove, hasMoved)
            });
        }
    },
    moveUp(row, col, callback) {
        let hasMoved = false
        if (row == 0 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row - 1][col] == 0) {
            let block = V.blocks[row][col];
            let position = V.positions[row - 1][col];
            V.blocks[row - 1][col] = block;
            V.data[row - 1][col] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.moveUp(row - 1, col, callback);
            });
            hasMoved = true;
        } else if (V.data[row - 1][col] == V.data[row][col]) {
            let block = V.blocks[row][col];
            let position = V.positions[row - 1][col];
            V.data[row - 1][col] *= 2;
            V.scoreExtra += V.data[row - 1][col]
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, () => {
                this.mergeNode(block, V.blocks[row - 1][col], V.data[row - 1][col], () => {
                    callback();
                });
            });
            hasMoved = true;
        } else {
            callback();
            return;
        }
    },
    inputUp() {

        let hasMoved = true;
        console.log("Down");


        let getNodeToMove = [];
        for (let row = 0; row < V.rows; row++) {
            for (let col = 0; col < V.rows; col++) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        let counter = 0;
        for (let i = 0; i < getNodeToMove.length; ++i) {
            this.moveUp(getNodeToMove[i].x, getNodeToMove[i].y, () => {
                counter++;
                this.checkCounter(counter, getNodeToMove, hasMoved)
            });
        }


    },
    moveDown(row, col, callback) {
        let hasMoved = true;
        if (row == V.rows - 1 || V.data[row][col] == 0) {
            callback();
            return;
        } else
            if (V.data[row + 1][col] == 0) {
                let block = V.blocks[row][col];
                let position = V.positions[row + 1][col];
                V.blocks[row + 1][col] = block;
                V.data[row + 1][col] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                this.moveNode(block, position, () => {
                    this.moveDown(row + 1, col, callback);
                });
            } else if (V.data[row + 1][col] == V.data[row][col]) {
                let block = V.blocks[row][col];
                let position = V.positions[row + 1][col];
                V.data[row + 1][col] *= 2;
                V.scoreExtra += V.data[row + 1][col]
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                this.moveNode(block, position, () => {
                    this.mergeNode(block, V.blocks[row + 1][col], V.data[row + 1][col], () => {
                        callback();
                    });
                });
                hasMoved = true;
            } else {
                callback();
                return;
            }
    },
    inputDown() {
        cc.log('move down');
        let hasMoved = true;
        let getNodeToMove = [];
        for (let row = V.rows - 1; row >= 0; row--) {
            for (let col = 0; col < V.rows; col++) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        let counter = 0;
        for (let i = 0; i < getNodeToMove.length; i++) {
            this.moveDown(getNodeToMove[i].x, getNodeToMove[i].y, () => {
                counter++;
                this.checkCounter(counter, getNodeToMove, hasMoved)
            });
        }
    },
    checkCounter(counter, getNodeToMove, hasMoved) {
        if (counter == getNodeToMove.length) {
            this.afterMove(hasMoved);
        }
    },
    getNodeToMove() {
        let nodesToMove = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (V.data[row][col] != 0) {
                    nodesToMove.push({ x: row, y: col });
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
                if (V.blocks[row][col] != null) {
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
    update(dt) {
        // this._count++ 
        // if (this._count < 10) {
        //     this._arr.push (this._count)
        // }else {
        //     console.log(this._arr);
        // }
    }
});
