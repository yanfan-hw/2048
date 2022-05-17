let colors = require("colors");

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
        this.animZoom = cc.scaleTo(0.2, 1);
    },
    setNumber: function (number) {
        if (number == 0) {
            this.labelNum.node.active = false;
            this.background.color = colors[0];
        }
        else {
            this.labelNum.node.active = true;
            this.background.scale = 0;
            this.background.color = colors[number];
            this.background.runAction(this.animZoom);
            this.labelNum.string = number;
        }
    },
});
