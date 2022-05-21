
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
        _isNoneSound: false,
        _isNoneMusic: false
    },
    get isNoneSound() {
        return this._isNoneSound
    },
    set isNoneSound(value) {
        return this._isNoneSound = value
    },
    get isNoneMusic() {
        return this._isNoneMusic
    },
    set isNoneMusic(value) {
        return this._isNoneMusic = value
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isNoneMusic = false
        Emitter.instance.emit("transAudio", this);
    },


    playMusicBackground(loop){
        this.pauseAll()
        console.log(this.isNoneMusic);
        if (this.isNoneMusic) {
            return
        }
        cc.audioEngine.play(this.musicBackGround, loop);
    },

    playSoundLose(){
        this.pauseAll()
        if (this.isNoneSound) {
            return
        }
        cc.audioEngine.play(this.soundLose, false);
    },

    playSoundWin(){
        this.pauseAll()
        if (this.isNoneSound) {
            return
        }
        let soundWin = cc.audioEngine.play(this.soundWin, false);
        return soundWin;
    },
    playSoundClick(){
        if (this.isNoneSound) {
            return
        }
        let soundClick = cc.audioEngine.play(this.soundClick, false);
        return soundClick
    },
    pauseSoundClick(){
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
