const V = require("Variables");
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        mainMenu: cc.Node,
        noneSound: cc.Node,
        noneMusic: cc.Node,
        playBtn: cc.Node,
        _isNoneSound: false,
        _isNoneMusic: false,
        _isClick: false
    },
    get isClick(){
        return this._isClick
    },
    set isClick(value){
        return this._isClick = value
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isClick = false
        this.node.y = 1000;
        this.node.active = false;
        this.noneSound.active = this._isNoneSound;
        this.noneMusic.active = this._isNoneMusic;
    },

    start() {

    },
    onClickBtn() {
        console.log(this.isClick);
        if (this.isClick) {
            console.log("destroy");
            return
        }else {
            this.isClick = false
            console.log("open");
            this.openPopup();
        }
        
    },
    onClickBtnClose() {
        if (this.isClick == true) {
            V.audio.playSoundClick()
            this.hidePopup();
            this.isClick = false
        }

    },
    openPopup() {
        if (this.isClick) {
            return
        }else {
            V.audio.playSoundClick()
            this.isClick = true
            this.node.active = true;
            this.playBtn.active = false;
            cc.tween(this.mainMenu)
                .to(0.5, { opacity: 20 })
                .start();

            cc.tween(this.node)
                .to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' })
                .start();
        }
    },
    hidePopup() {
        this.playBtn.active = true;
        cc.tween(this.mainMenu)
            .to(0.5, { opacity: 255 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 1000) })
            .start();
    },
    onClickSound() {
        this.isNoneSound = !(this.isNoneSound);
        if (this.isNoneSound) {
            V.audio.pauseSoundClick()
            V.audio.isNoneSound = true
            V.isNoneSound = V.audio.isNoneSound
        }else {
            V.audio.isNoneSound = false
            V.isNoneSound = V.audio.isNoneSound
            V.audio.playSoundClick()
        }
        this.noneSound.active = this.isNoneSound;
    },
    onClickMusic() {
        this.isNoneMusic = !(this.isNoneMusic);
        if (this.isNoneMusic) {
            V.audio.pauseAll()
        }else {
            V.audio.playMusicBackground()
        }
        this.noneMusic.active = this.isNoneMusic;
    }
    // update (dt) {},
});
