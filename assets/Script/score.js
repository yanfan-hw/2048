const V = require("Variables");
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreNumber: cc.Label,
        scoreExtra: cc.Label,
        score:0
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
        this.scoreNumber.string = number
    }
    // update (dt) {},
});
