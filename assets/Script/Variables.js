// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let Variables = {
    rows: 4,
    cols: 4,
    numbers: [2,4],
    blocks: [],
    data: [],
    positions: [],
    // blocksNow: [],

    scoreGame: 0,
    scoreExtra: 0,
    bestScoreGame: 0,
    isNoneSound: false,
    isNondMusic:false,
    isCompleted: true,
    isMoved: false,
    // blockArr: [],


    score: null,
    bestScore: null,
    blocksLayout: null,
    block: null,
    audio: null,
    audio1: null,
    game: null,
    userData: {
        score: 0,
        moveStep: 0
    }
}
module.exports = Variables
cc.Class({
    extends: cc.Component,

    properties: {
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

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
