
### 插槽挂载子动画
#### dragonbone： native 和 h5都支持
1. 在Bone内部有一个`global`属性，是一个`Transform`类型的对象。里面有这些属性  
    ```
    float x;
    float y;
    float skewX;
    float skewY;
    float scaleX;
    float scaleY;
    ```
    其中x、y是当前`Bone`在整个动画节点上的位置。
2. 具体使用
```
    //获取到对应的Bone，可以缓存一份Bone，在update中直接用`this.posBone`来更新，不用多次调用`getBone`方法
    this.posBone = this.catComponet.currentDisplay.armature().getBone("standEarL");
    //获取到对应的位置
    let globalPos = cc.v2(this.posBone.global.x, this.posBone.global.y); 
    this.node.x = globalPos.x;
    this.node.y = -globalPos.y;
```
3. 需要注意的地方  
    1.子动画需要加在龙骨动画节点上  
    2.因为龙骨动画编辑器中的y坐标跟cocos的y坐标不一致，需要对`global.y`去反  
    3.拿到这个位置，就可以在update中根据更子动画的位置了

#### spine：native 和 h5 都支持
1. 在Bone内部有一个`worldX`和`worldY`的属性，当前`Bone`在整个动画节点上的位置。
2. 具体使用
```
    //获取到对应的Bone，native端必须每次调用findBone方法获取
    this.spineBone = this.spineDisplay.findBone('head');
    //设置位置
    this.spineTestNode.position = cc.v2(this.spineBone.worldX, this.spineBone.worldY);        
```
3. 需要注意的地方：   
    1.子动画需要加在龙骨动画节点上   
    2.在update中根据更子动画的位置的时候，native端必须每次调用findBone方法获取


### 远端加载动画资源
#### dragonbone： native 和 h5都支持
1. 实现思路，直接远端加载相应资源，构建一份`dragonAsset`和`dragonAtlasAsset`数据。
2. 具体实现：
```
var image = 'https://qiniustatic.wodidashi.com/remind_tex.png';
var ske = 'http://192.168.12.93:3000/image/remind/remind_ske.json';
var atlas = 'http://192.168.12.93:3000/image/remind/remind_tex.json';

let node = new cc.Node();
let dragonBonesNode = node.addComponent(dragonBones.ArmatureDisplay);
// node.parent = this.catComponet.currentDisplay.node
node.parent = this.node
node.x = 300;
node.y = 300;
this.node1 = node;

cc.loader.load(image, (error, texture) => { //先加载图片
    this.httpRequest(atlas, (error, atlasJson) => {  //加载
        this.httpRequest(ske, (error, dragonBonesJson) => {
            //构建 atlas
            var atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas._uuid = atlas;
            atlas.atlasJson = atlasJson;
            atlas.texture = 'https://qiniustatic.wodidashi.com/remind_tex.png';   //这里必须是资源路径

            //构建 dragonAtlasAsset
            var asset = new dragonBones.DragonBonesAsset();
            asset._uid = ske;
            asset.dragonBonesJson = dragonBonesJson;

            dragonBonesNode.dragonAtlasAsset = atlas;
            dragonBonesNode.dragonAsset = asset;
            dragonBonesNode.armatureName = 'remind';
            dragonBonesNode.playAnimation('remind', 0);
        })
    });
})


httpRequest(tUrl: string, callBack: (error, response)=>void){
    console.log("======>> start load url: ", tUrl);
    
    let xhr = new XMLHttpRequest();
    //设置 http 回调
    xhr.onreadystatechange = ()=> {
        // console.log("onreadystatechange", "readystate", xhr.readyState, "status", xhr.status);
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            let response = xhr.responseText;
            // console.log(" response :", response);
            callBack(null, response);
            console.log("load success url : ", tUrl);
            
        }
    };
    xhr.open("GET", tUrl, true);
    //这行必须有 参考资料: https://blog.csdn.net/yourdecision/article/details/1292885
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr.send();
}
```

3. 需要注意的地方：   
    1.`atlas.texture`需要为资源路径，会根据这个路径去cc.loader中找已经加载进来的资源


#### spine： h5 都支持、native不支持
1. 实现思路，直接远端加载相应资源，构建一份`dragonAsset`和`dragonAtlasAsset`数据。
2. 具体实现：
```
cc.loader.load(image, (error, texture) => {
    if (error) {
        console.log("loadRemoteSpine error: ", error);
        return;
    }
    this.httpRequest(atlas, (error, atlasJson) => {
        this.httpRequest(ske, (error, skeletonJson) => {
            let skeletonData = new sp.SkeletonData();
            skeletonData.atlasText = atlasJson;
            skeletonData._atlasText = atlasJson;
            skeletonData.atlasUrl = atlas;
            skeletonData.skeletonJson = JSON.parse(skeletonJson);
            skeletonData.textures.push(image);

            petSpine.skeletonData = skeletonData;
            petSpine.animation = "idle";
            petSpine.loop = true;
        });
    });
})
```

3. native 不支持的原因是因为，因为skeletonData创建，依赖cc.loader.getRes， 但是cc.loader不支持远端加载配置文件。后续要做的话，解决方案大概是修改js引擎，把初始化skeletonData数据这一块做大规模修改。