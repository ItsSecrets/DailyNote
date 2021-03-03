## 1. 资源的定义
在 Creator 中，所有继承自 `cc.Asset` 的类型都统称资源，如:`cc.Texture2D, cc.SpriteFrame, cc.Atlas, cc.Material, cc.AnimationClip, cc.Prefab, cc.AudioClip, cc.JsonAsset, cc.TextAsset, cc.Font, sp.SkeletonData, sp.sp.SkeletonTexture`等。它们的加载是统一并且自动化的，相互依赖的资源能够被自动预加载。

还有一类特殊资源：js代码-cc.Script。

关键词：相互依赖，自动加载

## 2. 资源的类型
按使用方式来划分，资源可以分为动态资源和静态资源：
### 1. 动态资源：
存放路径：存放在`/assets/resouces/`下的所有资源  
加载方式：通过接口`cc.loader.loadRes`加载资源的路径url，游戏中可以直接查询到某个资源是否已经加载到内存中。  
构建：动态资源会全部被构建到资源包中

### 2. 静态资源：
存放路径：存放在`/assets/`下非assets/resources/目录的的所有资源  
加载方式：通过被assets/resources/下的资源引用而间接加载(uuid)，不能直接通过路径url来加载或判断其资源是否已加载。  
构建：只有被/assets/resources/ 下资源引用到的资源才会被构建到资源包中

## 3.资源释放
### 1.游戏中哪些资源需要释放
游戏中，主要是占据较多内存的资源以及低频率使用的资源需要被释放。  
游戏中占据内存大头的资源是贴图资源，所以资源释放的主要对象是cc.Texture2D。  
而游戏中cc.Texture2D都是间接被使用，主要有以下资源类型：  
 - cc.SpriteFrame: 间接包含了cc.Texture2D, cc.JsonAsset。
 - cc.Atlas：包含了多个cc.SpriteFrame对象。
 - sp.SkeletonData: spine中包含了多个cc.Texture2D和cc.Atlas对象。  
因此所有直接/间接使用到以上资源的对象都需要做加载&释放管理。体现在游戏中，主要有以下文件类型：
 - xxx.prefab：prefab中包含了对png和yyy.prefab的引用，通过释放prefab的依赖来释放它引用的贴图资源。
 - xxx.fire:场景中包含了对png/prefab的引用，通过释放场景依赖来释放它引用的贴图资源。
 - xxx.png：直接通过动态加载的png需要自行释放。
 - spine(cc.SkeletonData): spine中引用了贴图资源，因此需要释放。
### 2. 不需要被管理的资源
游戏中会长驻的资源是不需要被管理的，主要有以下资源：
 - cc.AudioClip:音效资源是通过动态引用/加载的，数量较少且只有唯一性，可以长驻。
 - cc.AnimationClip:目前使用到的动效资源是动态引用/加载的，只有唯一性，可以长驻。
 - cc.Material:材质资源是随着静态引用/加载的，只有唯一性，必须长驻。
 - cc.Font:字体资源是被静态加载的，只有唯一性，必须长驻。
 - cc.Script:全局唯一，必须长驻。（不应该被释放，依赖结果中已经剃除脚本）
### 3.加载&释放方案
1. cc.instantiate实例化后的节点A被加到cc.loader.loadRes添加的界面B上，只释放B界面的所有依赖就可以了？  
答：不可以，获取B的依赖时，不会包括A节点上的资源

2. cc.instantiate实例化后的节点A中某个Sprite节点N通过loadImage加载过贴图B.png(N节点之前使用的是C.PNG)，只释放A的所有依赖就可以了？  
答：不可以，A的依赖不会包含B.png，必须单独再释放B.png。


### 4. 优化资源释放
对于二级弹框和场景资源释放，可以使用cc.loader.release接口配合场景的“自动释放”属性来实现 。
对于一个二级面板，我们可以约定这个二级面板引用的资源范围。我们把游戏中共用的资源放到Common图集中，把每个二级面板的资源放到自己的图集中。当释放资源的时候，我们可以通过 cc.loader.getDependsRecursively(‘prefab url’) API拿到面板Prefab所引用的所有资源，然后对这个返回的资源数组做资源释放。
比如，在我们的项目里面，释放资源的时候，我排除了Common，Main，Game/FX目录下面的图集资源：
```
let excludeStr = []
excludeStr.push("Common");
excludeStr.push("Main");
excludeStr.push("Game/FX");
export function releasePrefabRes(prefabUrl: string, excludeArr?: string[]) {
    var deps = cc.loader.getDependsRecursively(prefabUrl);
    if (deps) {
        for (let i = 0; i < deps.length; i++) {
            let str: string = deps[i];
            for (let index = 0; index < excludeArr.length; index++) {
                let excludeStr = excludeArr[index];
                if (str.indexOf(excludeStr) !== -1) {
                    deps.splice(i, 1);
                }
            }
        }
        cc.loader.release(deps);
    }
}
```
 场景的资源释放只需要勾选一个属性就可以了：
