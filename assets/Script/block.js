let colors = require("colors");
cc.log(colors);

cc.Class({
    extends: cc.Component,

    properties: {
        labelNum: {
            default: null,
            type: cc.Label
        }
    },
    setNumber: function (number) {
        if (number == 0) {
            this.labelNum.node.active = false;
            this.node.color = colors[0];
        }
        else {
            this.labelNum.string = number;
            this.labelNum.node.active = true;

            this.node.color = colors[number];
        }
    },
});
