cc.Class({
    extends: cc.Component,

    properties: {
        playAgainBtn: cc.Node,
        labelScore: cc.Label,
        boardGame: cc.Node,
        Ala:cc.Node,
    },

    onLoad() {
        this.node.y = 1000;
        this._animOpenPopup();
        this._animAla();

    },
    _animOpenPopup() {
        cc.tween(this.boardGame)
            .to(.5, { opacity: 50 })
            .start();

        cc.tween(this.node)
            .to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' })
            .call(() => {
                this._animOpenBtnPlayAgain();
                this.labelScore.string = 0;
                this._animScore();
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
    _animScore() {
        let score = { value: 0 };
        cc.tween(score)
            .to(2, { value: 200000 }, {
                progress: (s, e, c, t) => {
                    let num = Math.round(e * t);
                    this.labelScore.string = String(num);
                }
            })
            .start();
    },

    _animAla(){
        let actionSacle1=cc.scaleTo(2,1.2,1.2);
        let actionScale2=cc.scaleTo(2,1,1);
        let Action =cc.repeatForever(cc.sequence(actionSacle1,actionScale2));
        this.Ala.runAction(Action);
    },
    start() {

    },
    onClickPlayAgainBtn() {
        this._animHidePopup();
        this.boardGame.opacity = 255;
    }

    // update (dt) {},
});

