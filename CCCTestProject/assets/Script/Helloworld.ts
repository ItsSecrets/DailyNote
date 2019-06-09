const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Prefab)
    dragonBonesPrefab:cc.Prefab = null;



    start () {
        cc.director.setDisplayStats(true);
    }

    onLoad(){
        this.initDragonBonesTest();


    }

    initDragonBonesTest(){
        let node = cc.instantiate(this.dragonBonesPrefab);
        node.parent = this.node;
    }

    initJSBindingTest(){
        this.node.setScale(((this.node.scale == 1) ? 0.5 : 1));
    }
}
