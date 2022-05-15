const ROWS = 4;
cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.blockInit();
    },

    arrayInit: function (xDimension, yDimension) {
        let blockArr = new Array();
        for (let i = 0; i < xDimension; i++) {
            blockArr[i] = new Array();
            for (let j = 0; j < yDimension; j++) {
                blockArr[i][j] = 0;
            }
        }
        return blockArr;
    },

    blockInit: function () {
        this.blockArr = this.arrayInit(ROWS, ROWS);

        for (let n = 0; n < ROWS; n++) {
            for (let i = 0; i < ROWS; i++) {
                let block = cc.instantiate(this.blockPrefab);
                this.node.addChild(block);
                block.getComponent("block").setNumber(0);
                this.blockArr[n][i] = block;
            }
        }
    }
    // update (dt) {},
});
