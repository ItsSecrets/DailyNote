// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
// cc.dynamicAtlasManager.showDebug(true);
@ccclass
export default class DrawCall extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.dynamicAtlasManager.enabled = true;
    }

    start () {
        // this.scheduleOnce(this.addDebugInfo.bind(this), 1);
    }

    addDebugInfo(){
        let node = cc.dynamicAtlasManager.showDebug(true);
        node.parent = this.node;
    }

    // update (dt) {}
}
