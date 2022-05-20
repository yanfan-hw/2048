cc.Class({
    extends: cc.Component,

    properties: {
        mainMenu: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.y = 1000;
        this.node.active = false;
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
        
    }
    // update (dt) {},
});
