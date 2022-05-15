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
        gameBoard: {
            default: null,
            type: cc.Node
        },
        _text: '2048'
    },

    // use this for initialization
    onLoad: function () {
        this.gameBoard.active = false;

        cc.tween(this.label.node)
            .to(2, { opacity: 0 })
            .call(() => {
                this.background.color = new cc.Color(255, 255, 255);
                this.gameBoard.active = true; 
            })
            .start()
        this.label.string = this._text;
        this.label.fontSize = 200;
    },

    // called every frame
    // update: function (dt) {
    // },
});
