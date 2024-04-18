class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.smileKey = null;
        this.fangsKey = null;
        this.moveLeft = null;
        this.moveRight = null;

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY - 20;
        this.leftLegX = this.bodyX - 100;
        this.leftLeg2X = this.bodyX - 50;
        this.rightLegX = this.bodyX + 100;
        this.rightLeg2X = this.bodyX + 50;
        this.legY = this.bodyY + 150;
        this.leg2Y = this.bodyY + 180;
        this.leftArmX = this.bodyX - 90;
        this.leftArmY = this.bodyY - 60;
        this.rightArmX = this.bodyX + 90;
        this.rightArmY = this.bodyY - 60;
        this.bellyX = this.bodyX;
        this.bellyY = this.bodyY + 80;
        this.leftEyeX = this.bodyX - 50;
        this.leftEyeY = this.bodyY - 50;
        this.rightEyeX = this.bodyX + 50;
        this.rightEyeY = this.bodyY - 50;
        this.rightAntennaX = this.bodyX + 45;
        this.rightAntennaY = this.bodyY - 110;
        this.leftAntennaX = this.bodyX - 45;
        this.leftAntennaY = this.bodyY - 110;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        this.smileKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fangsKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.smileKey.on('down', (key, event) => {
            my.sprite.smileMouth.visible = true;
            my.sprite.fangsMouth.visible = false;
        });
        this.fangsKey.on('down', (key, event) => {
            my.sprite.smileMouth.visible = false;
            my.sprite.fangsMouth.visible = true;
        });

        this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenF.png");
        my.sprite.smileMouth = this.add.sprite(this.bodyX, this.bodyY - 20, "monsterParts", "mouthA.png");
        my.sprite.fangsMouth = this.add.sprite(this.bodyX, this.bodyY - 20, "monsterParts", "mouthB.png");
        my.sprite.fangsMouth.visible = false;

        my.sprite.leftLeg = this.add.sprite(this.bodyX - 100, this.bodyY + 150, "monsterParts", "leg_greenE.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.bodyX + 100, this.bodyY + 150, "monsterParts", "leg_greenE.png");
        my.sprite.leftLeg2 = this.add.sprite(this.bodyX - 50, this.bodyY + 180, "monsterParts", "leg_greenE.png");
        my.sprite.leftLeg2.flipX = true;
        my.sprite.rightLeg2 = this.add.sprite(this.bodyX + 50, this.bodyY + 180, "monsterParts", "leg_greenE.png");
        
        my.sprite.rightArm = this.add.sprite(this.bodyX + 90, this.bodyY - 60, "monsterParts", "arm_greenA.png");
        my.sprite.rightArm.flipY = true;
        my.sprite.leftArm = this.add.sprite(this.bodyX - 90, this.bodyY - 60, "monsterParts", "arm_greenA.png");
        my.sprite.leftArm.flipY = true;
        my.sprite.leftArm.flipX = true;

        my.sprite.belly = this.add.sprite(this.bodyX, this.bodyY + 80, "monsterParts", "body_darkD.png");

        my.sprite.leftEye = this.add.sprite(this.bodyX - 50, this.bodyY - 50, "monsterParts", "detail_dark_eye.png");
        my.sprite.leftEye.flipX = true;
        my.sprite.leftEye.flipY = true;
        my.sprite.rightEye = this.add.sprite(this.bodyX + 50, this.bodyY - 50, "monsterParts", "detail_dark_eye.png");
        my.sprite.rightEye.flipY = true;
        my.sprite.rightEyeball = this.add.sprite(this.bodyX + 50, this.bodyY - 40, "monsterParts", "eye_cute_dark.png");
        my.sprite.leftEyeball = this.add.sprite(this.bodyX - 50, this.bodyY - 40, "monsterParts", "eye_cute_dark.png");
        
        my.sprite.rightAntenna = this.add.sprite(this.bodyX + 45, this.bodyY - 110, "monsterParts", "detail_white_antenna_large.png");
        my.sprite.leftAntenna = this.add.sprite(this.bodyX - 45, this.bodyY - 110, "monsterParts", "detail_white_antenna_large.png");
        my.sprite.leftAntenna.flipX = true;
        my.sprite.rightAntenna2 = this.add.sprite(this.bodyX + 20, this.bodyY - 130, "monsterParts", "detail_white_antenna_large.png");
        my.sprite.leftAntenna2 = this.add.sprite(this.bodyX - 20, this.bodyY - 130, "monsterParts", "detail_white_antenna_large.png");
        my.sprite.leftAntenna2.flipX = true;

        
        
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if (this.moveLeft.isDown){
            // Move the body and its dependent sprites to the left
            this.bodyX -= 5;
            this.mouthX -= 5;
            this.leftLegX -= 5;
            this.leftLeg2X -= 5;
            this.rightLegX -= 5;
            this.rightLeg2X -= 5;
            this.leftArmX -= 5;
            this.rightArmX -= 5;
            this.bellyX -= 5;
            this.leftEyeX -= 5;
            this.rightEyeX -= 5;
            this.rightAntennaX -= 5;
            this.leftAntennaX -= 5;
        }
        if (this.moveRight.isDown){
            // Move the body and its dependent sprites to the right
            this.bodyX += 5;
            this.mouthX += 5;
            this.leftLegX += 5;
            this.leftLeg2X += 5;
            this.rightLegX += 5;
            this.rightLeg2X += 5;
            this.leftArmX += 5;
            this.rightArmX += 5;
            this.bellyX += 5;
            this.leftEyeX += 5;
            this.rightEyeX += 5;
            this.rightAntennaX += 5;
            this.leftAntennaX += 5;
        }

        my.sprite.body.setPosition(this.bodyX, this.bodyY);
        my.sprite.smileMouth.setPosition(this.mouthX, this.mouthY);
        my.sprite.fangsMouth.setPosition(this.mouthX, this.mouthY);
        my.sprite.leftLeg.setPosition(this.leftLegX, this.legY);
        my.sprite.leftLeg2.setPosition(this.leftLeg2X, this.leg2Y);
        my.sprite.rightLeg.setPosition(this.rightLegX, this.legY);
        my.sprite.rightLeg2.setPosition(this.rightLeg2X, this.leg2Y);
        my.sprite.leftArm.setPosition(this.leftArmX, this.leftArmY);
        my.sprite.rightArm.setPosition(this.rightArmX, this.rightArmY);
        my.sprite.belly.setPosition(this.bellyX, this.bellyY);
        my.sprite.leftEye.setPosition(this.leftEyeX, this.leftEyeY);
        my.sprite.rightEye.setPosition(this.rightEyeX, this.rightEyeY);
        my.sprite.rightEyeball.setPosition(this.rightEyeX, this.rightEyeY + 10);
        my.sprite.leftEyeball.setPosition(this.leftEyeX, this.leftEyeY + 10);
        my.sprite.rightAntenna.setPosition(this.rightAntennaX, this.rightAntennaY);
        my.sprite.leftAntenna.setPosition(this.leftAntennaX, this.leftAntennaY);
        my.sprite.rightAntenna2.setPosition(this.rightAntenna2X, this.rightAntenna2Y);
        my.sprite.leftAntenna2.setPosition(this.leftAntenna2X, this.leftAntenna2Y);
    }
    

}