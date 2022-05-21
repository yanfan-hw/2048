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
        // scoreLabel: cc.Label,
        scoreNumber: cc.Label,
        scoreExtra: cc.Label,
        score:0
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

    },

    start () {
        Emitter.instance.emit('transScore', this);  
        this.scoreExtra.node.active = false
    },
    updateExtraScore(number) {
        
        let duration = 0.5
        if (number == 0) {
            return
        }
        console.log(number);
        this.scoreExtra.node.active = true
        this.scoreExtra.string = "+ " + number
        let actions = [cc.moveTo(0,0,0),
                        cc.moveTo(duration,0,20),
                        cc.moveTo(0,0,-20),
                        cc.callFunc( ()=> {this.scoreExtra.node.active = false}),
                        this.scoreExtra.node.stopAllActions(),
                    ]
        this.scoreExtra.node.runAction(cc.sequence(actions))
    },
    updateScore(number) {
        console.log("update score");
        this.scoreNumber.string = number
        // console.log( this.scoreLabel.string)
    }
    // update (dt) {},
});
