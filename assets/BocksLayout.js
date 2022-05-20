const V = require("Variables");
const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        BlockPrefab: cc.Prefab  ,
        gap: 20,
        flag:true,
        isCompleted: true,
        isMerged: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBlocksLayout', this);

        // this.getEmptyLocations()
    },
    createdBlock(width, height, x,y, label ) {
        let block = cc.instantiate(this.BlockPrefab);
        block.width = width;
        block.height = height;
        block.parent = this.node
        block.setPosition(cc.v2(x, y));
        block.getComponent('Block').setLabel(label);
        return block;
    },
    createBlocksLayout() {
        let y = 700;
        let distance = 20
        let size = 150
        for (let row = 0; row < 4; row++) {
            V.positions.push([0, 0, 0, 0]);
            let x = 200
            for (let col = 0; col < V.cols; col++) {
                this.createdBlock(size,size,x,y,0)
                V.positions[row][col] = cc.v2(x, y);
                x += distance + size ;
            }
            y -= distance + size
        }
    },  
    init() {
        for (let i = 0; i < 4; i++) {
            V.blocks.push([null, null, null, null]);
            V.data.push([0, 0, 0, 0]);
        }

        this.randomBlock();
        this.randomBlock();
        // this.randomBlock();
        // this.randomBlock();

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
        // console.log(emptyLocations);
        return emptyLocations;
    },
    randomBlock() {
        let emptyLocations = this.getEmptyLocations();
        if (emptyLocations == "") {
            return
        }
        // if (locations.length == 0) return false;
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

    mergeNode(b1, b2, num) {
        b1.destroy();  
        let scale1 = cc.scaleTo(0.1, 1.1);
        let scale2 = cc.scaleTo(0.1, 1);
        let mid = cc.callFunc(()=>{
            b2.getComponent('Block').setLabel(num);
        });
        let finished = cc.callFunc(()=>{ 
            //  
        });
        b2.runAction(cc.sequence(scale1, mid, scale2, finished));
    },

    afterMove(hasMoved) {
            this.randomBlock();            

    },
    // mergeDown(col){
    //     for (let row = 3; row >= 0; row--) {
    //         if (V.data[row][col] ==0 || row ==0) {
    //             return
    //         }
    //         // const element = arssray[0];
    //         if (V.data[row-1][col] == V.data[row][col] && V.data[row-1][col] !=0 ) {
    //             this.isMerged = true
    //             let block = V.blocks[row-1][col];
    //             let block1 = V.blocks[row][col]
    //             let positionToMove = V.positions[row][col];
    //             V.data[row][col] *= 2;
    //             V.data[row-1][col] = 0;
    //             V.blocks[row- 1][col] = null;
    //             let actionsMove = [cc.moveTo(0.05,positionToMove),
    //                             cc.callFunc(()=> {this.isCompleted = true;})]
    //             block.runAction(cc.sequence(actionsMove))
                
    //             let actionsMerge = [
    //                                 cc.callFunc( ()=> {this.mergeNode(block, block1, V.data[row][col])}),
    //                                 cc.callFunc( ()=> {}),
    //                             ]           
    //             block1.runAction(cc.sequence(actionsMerge))
    //             return
    //         } 
    //         // col--

            
    //     }
    // },
    // moveDown(row, col){
    //     // console.log(row);
    //     this.isCompleted = false;
        
    //         if (V.data[row][col] == 0 ) {
    //             this.mergeDown(col)
    //             return;
    //         } 
    //         let block = V.blocks[row][col];
    //         let positionToMove = V.positions[row+1][col];
    //         if (V.data[row+1][col] == 0) {
    //             V.blocks[row+1][col] = block;
    //             V.data[row+1][col] = V.data[row][col];
    //             V.data[row][col] = 0;
    //             V.blocks[row][col] = null;
    //             let actions = [cc.moveTo(0.05,positionToMove),
    //                             cc.callFunc( ()=> {this.moveDown(row+1, col)}),
    //                             cc.callFunc(()=> {this.isCompleted = true;})]
    //             block.runAction(cc.sequence(actions))
    //             return
    //         }

    //         else {
    //             this.moveDown(row+1, col);
    //             this.isCompleted = true
    //             return;
    //         }
    // },

    mergeUpData(col){
        for (let row = 3; row >= 0; row--) {
            if (V.data[row][col] == 0 || row == 0) {
                return
            }
            // const element = arssray[0];
            if (V.data[row-1][col] == V.data[row][col]  ) {
                // this.isMerged = true
                let block = V.blocks[row][col];
                let block1 = V.blocks[row-1][col]
                let positionToMove = V.positions[row-1][col];
                V.data[row-1][col] *= 2;
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actionsMove = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actionsMove))
                
                let actionsMerge = [
                                    cc.callFunc( ()=> {this.mergeNode(block, block1, V.data[row-1][col])}),
                                    cc.callFunc( ()=> {}),
                                ]           
                block1.runAction(cc.sequence(actionsMerge))
                return
            } 

        }
    },

    mergeDown(col){
        console.log("Dow");
        for (let row = 0; row < 4; row++) {
            if (row ==3) {

                console.log("return");
                return
            }
            // const element = arssray[0];
            if (V.data[row+1][col] == V.data[row][col] && V.data[row+1][col] !=0 ) {
                console.log("===sequence");
                this.isMerged = true
                let block = V.blocks[row][col];
                let block1 = V.blocks[row+1][col]
                let positionToMove = V.positions[row+1][col];
                V.data[row+1][col] *= 2;
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actionsMove = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actionsMove))
                
                let actionsMerge = [
                                    cc.callFunc( ()=> {this.mergeNode(block, block1, V.data[row+1][col])}),
                                    cc.callFunc( ()=> {}),
                                ]           
                block1.runAction(cc.sequence(actionsMerge))
                return
            } 

        }
    },
    moveDown(row, col){
        // console.log(row);
        this.isCompleted = false;
        
            if (row == 3 ||V.data[row][col] == 0 ) {
                this.mergeDown(col )
                return;
            } 
            let block = V.blocks[row][col];
            let positionToMove = V.positions[row+1][col];
            if (V.data[row+1][col] == 0) {
                V.blocks[row+1][col] = block;
                V.data[row+1][col] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actions = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc( ()=> {this.moveDown(row+1, col)}),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actions))
                return
            }

            else {
                this.moveDown(row+1, col);
                this.isCompleted = true
                return;
            }
    },
    mergeRight(row) {
        console.log(row);
        for (let col = 3; col >= 0; col--) {
            if (V.data[row][col] ==0) {
                return
            }
            // const element = arssray[0];
            if (V.data[row][col-1] == V.data[row][col] && V.data[row][col-1] !=0 ) {
                this.isMerged = true
                let block = V.blocks[row][col-1];
                let block1 = V.blocks[row][col]
                let positionToMove = V.positions[row][col];
                V.data[row][col] *= 2;
                V.data[row][col-1] = 0;
                V.blocks[row][col-1] = null;
                let actionsMove = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actionsMove))
                
                let actionsMerge = [
                                    cc.callFunc( ()=> {this.mergeNode(block, block1, V.data[row][col])}),
                                    cc.callFunc( ()=> {}),
                                ]           
                block1.runAction(cc.sequence(actionsMerge))
                return
            } 
            // col--

            
        }
    },
    moveRight(row, col){
        this.isCompleted = false;
            if (col == 3 ||V.data[row][col] == 0 ) {
                this.mergeRight(row)
                return;
            } 
            let block = V.blocks[row][col];
            let positionToMove = V.positions[row][col+1];
            if (V.data[row][col+1] == 0) {
                V.blocks[row][col+1] = block;
                V.data[row][col+1] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actions = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc( ()=> {this.moveRight(row, col+1)}),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actions))
                return
            }
            // if (V.data[row][col+1] == V.data[row][col] && this.isMerged == false) {
            //     V.data[row][col+1] *= 2;
            //     V.data[row][col] = 0;
            //     V.blocks[row][col] = null;
            //     let actionsMove = [cc.moveTo(0.05,positionToMove),
            //                     cc.callFunc(()=> {this.isCompleted = true;})]
            //     block.runAction(cc.sequence(actionsMove))
                
            //     let actionsMerge = [
            //                         cc.callFunc( ()=> {this.mergeNode(block, V.blocks[row][col+1], V.data[row][col+1])}),
                                    
            //                         cc.callFunc( ()=> {this.moveRight(row, col)})]           
            //     V.blocks[row][col+1].runAction(cc.sequence(actionsMerge))
            // } 
            else
             {
                this.moveRight(row, col+1);
                this.isCompleted = true
                return;
            }

    },
    mergeLeft(row) {
        for (let col = 0; col < 4; col++) {
            if (V.data[row][col] ==0) {
                return
            }
        if (V.data[row][col] == V.data[row][col+1]) {
            let block = V.blocks[row][col+1];
            let block1 = V.blocks[row][col]
            let positionToMove = V.positions[row][col];
            V.data[row][col] *= 2;
            V.data[row][col+1] = 0;
            V.blocks[row][col+1] = null;
            let actionsMove = [cc.moveTo(0.05,positionToMove),
                            cc.callFunc(()=> {this.isCompleted = true;})]
            block.runAction(cc.sequence(actionsMove))
            
            let actionsMerge = [
                                cc.callFunc( ()=> {this.mergeNode(block, block1, V.data[row][col])}),
                                cc.callFunc( ()=> {}),
                                // cc.callFunc( ()=> {this.moveLeft(row, col)}) 
                            ]           
            block1.runAction(cc.sequence(actionsMerge))
            return
        }
        // col++
    }
    },
    moveLeft(row, col){
        // console.log(row);
        this.isCompleted = false;
            if (col == 0 ||V.data[row][col] == 0 ) {
                this.mergeLeft(row)
                return;
            } 
            let block = V.blocks[row][col];
            let positionToMove = V.positions[row][col-1];
            if (V.data[row][col-1] == 0) {
                V.blocks[row][col-1] = block;
                V.data[row][col-1] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actions = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc( ()=> {this.moveLeft(row, col-1)}),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actions))
                return
            }
 
            else {
                this.moveLeft(row, col-1);
                this.isCompleted = true
                return;
            }
    },
    moveUp(row, col){
        // console.log(row);
        this.isCompleted = false;
        
            if (row == 0 ||V.data[row][col] == 0 ) {
                this.mergeUpData(col)
                return;
            } 
            let block = V.blocks[row][col];
            let positionToMove = V.positions[row-1][col];
            if (V.data[row-1][col] == 0) {
                V.blocks[row-1][col] = block;
                V.data[row-1][col] = V.data[row][col];
                V.data[row][col] = 0;
                V.blocks[row][col] = null;
                let actions = [cc.moveTo(0.05,positionToMove),
                                cc.callFunc( ()=> {this.moveUp(row-1, col)}),
                                cc.callFunc(()=> {this.isCompleted = true;})]
                block.runAction(cc.sequence(actions))
                return
            }

            else {
                this.moveUp(row-1, col);
                this.isCompleted = true
                return;
            }
    },


    inputUp() {
        let nodesToMove = this.getNodeToMove()
        console.log(nodesToMove);
        for (let i = 0  ; i < nodesToMove.length ; i++) {  
            let actions = [ cc.callFunc( ()=> {this.moveUp(nodesToMove[i].x, nodesToMove[i].y)}),
                            cc.callFunc( ()=> {this.isMerged = false}),
                            cc.delayTime(0.1), 
                            cc.callFunc( ( )=> {
                                if (i == 0)  {
                                    this.randomBlock()
                                }
                            })]
            this.node.runAction(cc.sequence(actions))
        } 
    },
    inputDown() {
        let nodesToMove = this.getNodeToMove()
        
        console.log(nodesToMove);
        for (let i = nodesToMove.length -1  ; i >= 0; i--) {  
            let actions = [ cc.callFunc( ()=> {this.moveDown(nodesToMove[i].x, nodesToMove[i].y)}),
                            cc.callFunc( ()=> {this.isMerged = false}),
                            cc.delayTime(0.1), 
                            cc.callFunc( ( )=> {
                                if (i == 0)  {
                                    this.randomBlock()
                                }
                            })]
            this.node.runAction(cc.sequence(actions))
        } 
    },
    inputLeft() {
        let nodesToMove = this.getNodeToMove()
        
        for (let i = 0 ; i < nodesToMove.length; i++) {  
            let actions = [ cc.callFunc( ()=> {this.moveLeft(nodesToMove[i].x, nodesToMove[i].y)}),
                            cc.delayTime(0.2), 
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
    start () {
        this.createBlocksLayout();
        this.init();
    },

    // update (dt) {},
});
