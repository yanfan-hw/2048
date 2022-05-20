// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const EventEmitter = require('events');
 class mEmitter {
    constructor() {
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
}
    emit(...args)
    {
        this._emiter.emit(...args);
    }
    registerEvent(event, listener) {
        this._emiter.on(event, listener);
    }
    registerOnce(event, listener){
        this._emiter.once(event, listener);
    }
    removeEvent(event, listener) {
        this._emiter.removeListener(event, listener);
}
destroy() {
        this._emiter.removeAllListeners();
        this._emiter = null;
        mEmitter.instance = null;
} }
 mEmitter.instance = null;
 module.exports = mEmitter;
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
