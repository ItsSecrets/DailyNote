
const {ccclass, property} = cc._decorator;

@ccclass
export default class DragonBonesTest extends cc.Component {

    @property(dragonBones.ArmatureDisplay)
    curDisplay: dragonBones.ArmatureDisplay = null;
    
    @property(cc.Node)
    dragonNode:cc.Node = null;

    curSkinIndex:number = 0;

    onLoad () {
        this.curDisplay = this.dragonNode.getComponent(dragonBones.ArmatureDisplay);
    }

    onChangeSkinBtnClicked(){
        let rurl = cc.url.raw("resources/dragon_res/cat_tex1.png");
        cc.loader.load({ url: rurl, type: 'png' }, (err, tex)=>{
            if (err) {
                cc.error(err.message || err);
                return;
            }
            if (tex instanceof cc.Texture2D) {
                this.curDisplay.armature().replaceTexture(tex);
            }
        });
    }

    onChangePartSkinClicked(){
        let rurl = cc.url.raw(this.getCurPartSkin());
        cc.loader.load({ url: rurl, type: 'png' }, (err, tex) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            if (tex instanceof cc.Texture2D) {
                let armature = this.curDisplay.armature();
                if (armature == null) {
                    console.log("[restoreMakeup animation] not exist");
                    return;
                }

                let slot = armature.getSlot("sclothes");
                if (slot && slot.display && slot.display.setSpriteFrame) {
                    let spriteFrame = new cc.SpriteFrame(tex, new cc.Rect(0, 0, tex.pixelWidth, tex.pixelHeight));
                    slot.display.setSpriteFrame(spriteFrame);
                }
                else {
                    console.log("can not find slot or display, slot =", slot, " display =", slot.display);
                }
            }
        });
    }

    getCurPartSkin(){
        this.curSkinIndex = this.curSkinIndex+1;
        if (this.curSkinIndex>3) {
            this.curSkinIndex = 0;
        }
        return `resources/dragon_res/clo_${this.curSkinIndex}.png`;

    }
    // update (dt) {}
}
