cc.Class({
    extends: cc.Component,

    properties: {
        mainMenu: cc.Node,
        noneSound: cc.Node,
        noneMusic: cc.Node,
        playBtn: cc.Node,
        _isNoneSound: false,
        _isNoneMusic: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.y = 1000;
        this.node.active = false;
        this.noneSound.active = this._isNoneSound;
        this.noneMusic.active = this._isNoneMusic;
    },

    start() {

    },
    onClickBtn() {
        this.openPopup();
    },
    onClickSubmit() {
        this.hidePopup();
    },
    openPopup() {
        this.node.active = true;
        this.playBtn.active = false;
        cc.tween(this.mainMenu)
            .to(.5, { opacity: 20 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' })
            .call(() => {
                cc.log("ok")
            })
            .start();
    },
    hidePopup() {
        this.playBtn.active = true;
        cc.tween(this.mainMenu)
            .to(.5, { opacity: 255 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 1000) })
            .start();
    },
    onClickSound() {
        this.isNoneSound = !(this.isNoneSound);
        this.noneSound.active = this.isNoneSound;
        cc.log(this._isNoneSound);
    },
    onClickMusic() {
        this.isNoneMusic = !(this.isNoneMusic);
        this.noneMusic.active = this.isNoneMusic;
        cc.log(this._isNoneSound);
    }
    // update (dt) {},
});
