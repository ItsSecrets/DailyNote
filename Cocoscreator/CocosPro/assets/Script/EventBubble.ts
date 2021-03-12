// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventBubble extends cc.Component {

    EVENT_KEY = "EVENT_KEY";

    nodeA: cc.Node = null;
    nodeB:cc.Node = null;
    nodeC:cc.Node = null;
    nodeD: cc.Node = null;

    onLoad () {
        this.nodeA = cc.find('a', this.node)
        this.nodeB = cc.find('b', this.nodeA)
        this.nodeC = cc.find('c', this.nodeB)
        this.nodeD = cc.find('d', this.nodeB)

        this.initEvent();
    }

    initEvent(){
        this.nodeA.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            console.log("-- nodeA --");
        });
        this.nodeB.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            console.log("-- nodeB --");
        });
        this.nodeC.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            console.log("-- nodeC --");
        });
        this.nodeD.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            console.log("-- nodeD --");
            event.stopPropagation();
        });


        this.node.on(this.EVENT_KEY, (params1, params2)=>{
            console.log(`--- node event ---`);
        })

        this.nodeC.on(this.EVENT_KEY, (event:cc.Event) => {
            console.log(`--- nodeC event ---`);
            event.stopPropagation()
        })

    }

    emitEvent(){
        // this.nodeC.emit(this.EVENT_KEY, "params1", "params2")

        this.node.dispatchEvent(new cc.Event(this.EVENT_KEY, true))
    }
    start () {

    }

    // update (dt) {}
}
