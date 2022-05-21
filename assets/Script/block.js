const Emitter = require('mEmitter');
let colors = require("colors");
// const colors = require('colors')

cc.Class({
    extends: cc.Component,

    properties: {
        labelNum: {
            default: null,
            type: cc.Label
        },
        background: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        Emitter.instance.emit('transBlock', this);
    },
    setLabel(label) {
        if (label == 0) {
            this.labelNum.string = ""
        } else {
            this.labelNum.string = label 
        }
        this.node.color = colors[label];
        return 1
    },
    appear() {
        let actions = [ cc.scaleTo(0, 0),
                        cc.scaleTo(0.05,1)]
        this.node.runAction(cc.sequence(actions))
    },
    merge() {
        let actions = [ cc.scaleTo(0.05, 1.3),
                        cc.scaleTo(0.05, 1),
                        ]
        this.node.runAction(cc.sequence(actions))
    },
});
