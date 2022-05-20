
const Emitter = require('mEmitter');
const Variables = require('Variables');

cc.Class({
    extends: cc.Component,

    properties: {
        music:{
            default:null,
            type:cc.AudioClip
        },
        audioLose:{
            default:null,
            type:cc.AudioClip
        },
        audioWin:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transAudio, this);
    },


    playMusic(){
        this.pauseAll()
        cc.audioEngine.play(this.music, false);
    },

    playAudioLose(){
        this.pauseAll()
        cc.audioEngine.play(this.audioLose, false);
    },

    playAudioWin(){
        this.pauseAll()
        cc.audioEngine.play(this.audioWin, false);
    },

    pauseAll() {
        cc.audioEngine.pauseAll()
    },
    start () {

    },

    // update (dt) {},
});
