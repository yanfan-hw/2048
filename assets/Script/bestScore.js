// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require('mEmitter');
const V = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        bestScoreNumber: cc.Label
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBestScore', this);
    },
    updateBestScore(number) {
        this.bestScoreNumber.string = number
    },
    saveBestScore(userData) {
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData))
    },
    loadBestScore() {
        console.log("best Score");
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData == null) {
            this.saveBestScore(V.userData)
            return
        }
        // console.log(userData.score);
        this.updateBestScore(userData.score)
        return userData
        
    },

    start () {

    },

    // update (dt) {},
});
