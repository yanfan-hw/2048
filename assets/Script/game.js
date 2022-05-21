const V = require("Variables");
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        btnNewGame:cc.Button
    },

    onLoad: function () {
        // Emitter.instance = new Emitter();
        // Emitter.instance.emit('transGame', this);
        Emitter.instance.registerEvent("transBlocksLayout", this.transBlocksLayout, this);
        Emitter.instance.registerEvent("transBlock", this.transBlock, this);
        Emitter.instance.registerEvent("transScore", this.transScore, this);
        Emitter.instance.registerEvent("transBestScore", this.transBestScore, this);
        Emitter.instance.registerEvent("transAudio", this.transAudio, this);
        Emitter.instance.registerEvent("onEnableKeyDown", this.initEvent.bind(this));

        // Emitter.instance.registerEvent("transAudioSceneWelcomeToMain", this.transAudioSceneWelcomeToMain, this);
        Emitter.instance.registerEvent("onDisabledKeyDown", this.onDisabledKeyDown.bind(this));
        Emitter.instance.registerEvent("onDisableKeyDownLoseGame", this.onDisabledKeyDown.bind(this));
        V.game = this.btnNewGame
        this.initEvent();
    },
    init() {
        V.bestScore.loadBestScore()
    },
    initEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on('touchstart', (event) => {
            this.startPoint = event.getLocation()
        })
        this.node.on('touchend', (event) => {
            this.TouchEnd(event);
        })
    },
    // transAudioSceneWelcomeToMain(data) {
    //     console.log(data);
    // },
    transAudio(data) {
        V.audio1 = data
        V.audio1.isNoneSound = V.isNoneSound
    },
    transBestScore(data) {
        V.bestScore = data
    },
    transBlocksLayout(data) {
        V.blocksLayout = data
    },
    transBlock(data) {
        V.block = data
    },
    transScore(data) {
        V.score = data
    },
    TouchEnd(event) {
        this.endPoint = event.getLocation();
        let subVector = this.endPoint.sub(this.startPoint);
        let delta = subVector.mag();
        if (V.isCompleted == true) {
            if (delta > 50) {
                if (Math.abs(subVector.x) > Math.abs(subVector.y)) {
                    if (subVector.x > 0) {
                        V.isCompleted = false
                        V.audio1.playSoundClick()
                        V.blocksLayout.inputRight()
                        V.isMoved = false
                    } else {
                        V.isCompleted = false
                        V.audio1.playSoundClick()
                        V.blocksLayout.inputLeft()
                        V.isMoved = false
                    }
                } else {
                    if (subVector.y > 0) {
                        V.isCompleted = false
                        cc.log("up");
                        V.audio1.playSoundClick()
                        V.blocksLayout.inputUp()
                        V.isMoved = false
                    } else {
                        V.isCompleted = false
                        V.audio1.playSoundClick()
                        V.blocksLayout.inputDown()
                        V.isMoved = false
                    }
                }
            }
        }
        else{
            return
        }

        
    },


    onKeyDown: function (event) {
        if (V.isCompleted == false) {
            console.log("not Completed");
            return
        }
        V.isCompleted = false
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                V.audio1.playSoundClick()
                V.blocksLayout.inputDown()
                V.isMoved = false
                break;
            case cc.macro.KEY.up:
                V.audio1.playSoundClick()
                V.blocksLayout.inputUp()
                V.isMoved = false
                break;
            case cc.macro.KEY.left:
                V.audio1.playSoundClick()
                V.blocksLayout.inputLeft()
                V.isMoved = false
                break;
            case cc.macro.KEY.right:
                V.audio1.playSoundClick()
                V.blocksLayout.inputRight()
                V.isMoved = false
                break;
            default: {
                V.isCompleted = true
                return
            }
        }
    },
    onDisabledKeyDown() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.off('touchstart');
        this.node.off('touchend');
    },
    // called every frame
    start() {
        V.bestScore.loadBestScore()
    },
    update: function (dt) {

    },
});
