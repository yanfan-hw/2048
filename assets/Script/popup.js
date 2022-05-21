const Emitter = require('mEmitter');
const V = require("Variables");

cc.Class({
    extends: cc.Component,

    properties: {
        playAgainBtn: cc.Node,
        labelScore: cc.Label,
        particle: cc.Node,
        boardGame: cc.Node,

    },

    onLoad() {
        Emitter.instance.registerEvent("showPopupWinGame", this._animOpenPopup.bind(this));
        this.node.y = 1100;
        this.node.active = false;
    },
    _animOpenPopup(scoreGame) {
        V.audio.playSoundWin(); 
        this.node.active = true;
        this.particle.active = false;
        cc.tween(this.boardGame)
            .to(.5, { opacity: 50 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' })
            .call(() => {
                this._animOpenBtnPlayAgain();
                this.labelScore.string = 0;
                this._animScore(scoreGame);
            })
            .start();
    },
    _animationBtn() {
    },
    _animHidePopup() {
        cc.tween(this.boardGame)
            .to(.5, { opacity: 255 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 1000) })
            .start();
    },
    _animOpenBtnPlayAgain() {
        let action = cc.repeatForever(
            cc.sequence(
                cc.scaleBy(1, 0.9, 1.1),
                cc.scaleTo(1, 1, 1)
            )
        ).easing(cc.easeBackInOut(.5));
        this.playAgainBtn.runAction(action).easing((cc.easeBackInOut(.5)));
    },
    _animScore(scoreGame) {
        let score = { value: 0 };
        cc.tween(score)
            .to(2, { value: scoreGame }, {
                progress: (s, e, c, t) => {
                    let num = Math.round(e * t);
                    this.labelScore.string = String(num);
                }
            })
            .call(() => {
                this.particle.active = true;
            })
            .start();
    },
    start() {

    },
    onClickPlayAgainBtn() {
        this.node.active = false;
        this._animHidePopup();
        this.particle.active = false;
        this.boardGame.opacity = 255;
        V.audio.pauseSoundWin();
    }

    // update (dt) {},
});
