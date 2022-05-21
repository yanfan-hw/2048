
const Emitter = require('mEmitter');
const Variables = require('Variables');

cc.Class({
    extends: cc.Component,

    properties: {
        musicBackGround:{
            default:null,
            type:cc.AudioClip
        },
        soundLose:{
            default:null,
            type:cc.AudioClip
        },
        soundWin:{
            default:null,
            type:cc.AudioClip
        },
        soundClick:{
            default:null,
            type:cc.AudioClip
        },
        _isNoneSound: false
    },
    get isNoneSound() {
        return this._isNoneSound
    },
    set isNoneSound(value) {
        return this._isNoneSound = value
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit("transAudio", this);
    },


    playMusicBackground(loop){
        this.pauseAll()
        cc.audioEngine.play(this.musicBackGround, loop);
    },

    playSoundLose(){
        this.pauseAll()
        cc.audioEngine.play(this.soundLose, false);
    },

    playSoundWin(){
        this.pauseAll()
        let soundWin = cc.audioEngine.play(this.soundWin, false);
        return soundWin;
    },
    playSoundClick(){
        // this.pauseAll()l
        console.log("PlaySoundClick");
        // console.log(this.isNoneSound);
        if (this.isNoneSound) {
            return
        }
        let soundClick = cc.audioEngine.play(this.soundClick, false);
        return soundClick
    },
    pauseSoundClick(){
        // console.log("Puse Click");
        // let soundClick = pla
        cc.audioEngine.stop(this.playSoundClick());
        
    },
    pauseSoundWin() {
        cc.audioEngine.stop(this.playSoundWin());
        this.playMusicBackground(false);
    },
    pauseSoundLose() {
        cc.audioEngine.stop(this.playSoundWin());
        this.playMusicBackground(false);
    },

    pauseAll() {
        cc.audioEngine.pauseAll();
    },
    start () {

    },

    // update (dt) {},
});
