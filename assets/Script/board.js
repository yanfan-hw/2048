const ROWS = 4;
const NUMBERS = [2, 4];

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
        this.gameInit();
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
    },
    gameInit() {
        // * Update score 0
        this.data = this.arrayInit(ROWS, ROWS);

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < ROWS; col++) {
                this.blockArr[row][col].getComponent("block").setNumber(0);
                this.data[row][col] = 0;
            }
        }

        this.randomNumber();
        this.randomNumber();

    },
    randomNumber() {
        let locations = this.getEmptyLocations();
        if (locations.length == 0) return false;
        let location = locations[Math.floor(Math.random() * locations.length)];
        this.data[location.x][location.y] = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
        let block = this.blockArr[location.x][location.y].getComponent("block");
        block.setNumber(this.data[location.x][location.y]);
    },
    getEmptyLocations() {
        let locations = [];
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < ROWS; col++) {
                if (this.data[row][col] == 0) {
                    locations.push({
                        x: row,
                        y: col,
                    });
                }
            }
        }
        return locations;
    }
    // update (dt) {},
});
