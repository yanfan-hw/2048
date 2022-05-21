const V = require("Variables");
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        // Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("transBlocksLayout", this.transBlocksLayout, this);
        Emitter.instance.registerEvent("transBlock", this.transBlock, this);
        Emitter.instance.registerEvent("transScore", this.transScore, this);
        Emitter.instance.registerEvent("transBestScore", this.transBestScore, this);
        Emitter.instance.registerEvent("transAudio", this.transAudio, this);
        
        Emitter.instance.registerEvent("transAudioSceneWelcomeToMain", this.transAudioSceneWelcomeToMain, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on('touchstart', (event) => {
            this.startPoint = event.getLocation()
        })
        this.node.on('touchend', (event) => {
            this.TouchEnd(event);
        })


        console.log(V.audio.playSoundClick());
        console.log(V.audio.isNoneSound);
        console.log(V.isNoneSound);
    },
    init(){
        V.bestScore.loadBestScore()
    },
    transAudioSceneWelcomeToMain(data){
        console.log(data);
    },
    transAudio(data){
        V.audio1 = data
        V.audio1.isNoneSound = V.isNoneSound
        console.log(V.audio1.isNoneSound);
    },
    transBestScore(data){
        V.bestScore = data
        // console.log(V.bestScore);
    },
    transBlocksLayout(data) {
        V.blocksLayout = data
        // console.log(V.blocksLayout);
    },
    transBlock(data){
        V.block = data
    },
    transScore(data){
        V.score = data
    },
    TouchEnd(event){
        this.endPoint=event.getLocation();
        let subVector= this.endPoint.sub(this.startPoint);
        let delta=subVector.mag();
        if(delta>50){
            if(Math.abs(subVector.x) > Math.abs(subVector.y)){
                if(subVector.x>0){
                    cc.log("right");
                }else{
                    cc.log("left");
                }
            }else{
                if(subVector.y>0){
                    cc.log("up");
                }else{
                    cc.log("Down");
                }
            }
        }
    },

    
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                console.log('Press a key DOWN');
                // for (let col = 0; col < 4; col++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveDown(3,col)
                V.audio1.playSoundClick()
                V.blocksLayout.inputDown()
                // }
                
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.up:
                console.log('Press a key UP');
                // for (let col = 0; col <= 3; col++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveUp(0,col)
                V.audio1.playSoundClick()
                V.blocksLayout.inputUp()
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.left:
                console.log('Press a key LEFT');
                // for (let row = 0; row < 4; row++) {
                //     Variables.blockLayout._flag = true
                //     Variables.blockLayout.moveLeft(row)
                V.audio1.playSoundClick()
                V.blocksLayout.inputLeft()
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                break;
            case cc.macro.KEY.right:
                console.log('Press a key RIGHT');
                // for (let row = 0; row < 4; row++) {
                    // console.log(row);
                    // Variables.blockLayout._flag = true
                    // V.blocksLayout.inputRight()///
                    // V.blocksLayout.moveRight(row,3)
                    // moveRight
                    // V.blocksLayout.randomBlock()
                   
                // }
                // Variables.blockLayout.countScore()
                // Variables.blockLayout.randomBlock();
                // for (let row = 0; row < 4; row++) {
                    
                    // Variables.blockLayout._flag = true
                    V.audio1.playSoundClick()
                    V.blocksLayout.inputRight()
                    
                   
                // }
                break;
            default : {
                return
            }
            

            
        }
        // Variables.blockLayout.countScore()
        // Variables.blockLayout.randomBlock();
    },
    // called every frame
    start(){
        V.bestScore.loadBestScore()
        
    },
    update: function (dt) {

    },
});
