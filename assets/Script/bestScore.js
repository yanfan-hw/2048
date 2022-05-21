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
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData == null) {
            this.saveBestScore(V.userData)
            return
        }
        this.updateBestScore(userData.score)
        return userData
        
    },

    start () {

    },

    // update (dt) {},
});
