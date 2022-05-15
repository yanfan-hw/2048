cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        background: {
            default: null,
            type: cc.Node
        },
        _text: '2048'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this._text;
        this.label.fontSize = 200;
        cc.tween(this.label.node)
            .to(2, { opacity: 0 })
            .call(() => {
                cc.director.loadScene("Main")
            })
            .start()
    },

    // update: function (dt) {
    // },
});
