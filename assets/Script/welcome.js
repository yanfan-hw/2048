cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        _text: '2048',
        mainMenu: cc.Node,
        btnPlay: cc.Node,
        btnSetting: cc.Node,
        cloud1: cc.Node,
        cloud2: cc.Node,
        logo: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this._text;
        this.label.fontSize = 200;
        this.mainMenu.active = false;

        // this.logo.x = 30;
        this.logo.angle = 30;

        cc.tween(this.label.node)
            .to(2, { opacity: 0 })
            .call(() => {
                this._initMainScreen();
            })
            .start()
    },
    _initMainScreen() {
        this.mainMenu.active = true;
        this.btnPlay.runAction(this._animationBtn());
        this.btnSetting.runAction(this._animationBtn());
        this.cloud1.runAction(this._animationCloud());
        this.cloud2.runAction(this._animationCloud());
        this.logo.runAction(this._animLogo());
    },
    _animationBtn() {
        return this.anim = cc.repeatForever(
            cc.sequence(
                cc.scaleBy(.5, 0.9, 1.1),
                cc.scaleTo(.5, 1, 1)
            )
        ).easing(cc.easeBackInOut(.5));
    },
    _animationCloud() {
        return this.anim2 = cc.repeatForever(
            cc.sequence(
                cc.moveBy(1, cc.v2(-15, 0)),
                cc.moveBy(1, cc.v2(15, 0))
            )
        ).easing(cc.easeBackInOut(.5));
    },
    _animLogo() {
        return this.anim3 = cc.rotateTo(5, 0).easing(cc.easeBackInOut(.5));
    }

    // update: function (dt) {
    // },
});
