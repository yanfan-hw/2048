// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const V = require("Variables");
const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        // BlockPrefab: cc.Prefab  
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("transBlocksLayout", this.transBlocksLayout, this);
        Emitter.instance.registerEvent("transBlock", this.transBlock, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    transBlocksLayout(data) {
        V.blocksLayout = data
        // console.log(V.blocksLayout);
    },
    transBlock(data){
        V.block = data
    },

    start () {

    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                console.log('Press a key DOWN');
                // for (let col = 0; col < 4; col++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveDown(3,col)
                V.blocksLayout.inputDown    ()
                // }
                
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.up:
                console.log('Press a key UP');
                // for (let col = 0; col <= 3; col++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveUp(0,col)
                V.blocksLayout.inputUp()
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.left:
                console.log('Press a key LEFT');
                // for (let row = 0; row < 4; row++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveLeft(row)
                V.blocksLayout.inputLeft()
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.right:
                console.log('Press a key RIGHT');
                // for (let row = 0; row < 4; row++) {
                    // console.log(row);
                    // Variables.blockLayout._flag = true
                    V.blocksLayout.inputRight()///
                    // V.blocksLayout.moveRight(row,3)
                    // moveRight
                    // V.blocksLayout.randomBlock()
                   
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                break;
            default : {
                return
            }
            

            
        }
        // Variables.blockLayout.countScore()
        // Variables.blockLayout.randomBlock();
    },

    // update (dt) {},
});
