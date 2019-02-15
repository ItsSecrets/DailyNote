
### 1. dragonBones
1. dragonBones相关代码位于引擎 `engine/extension/dragonBones`目录下。
2. 龙骨导出文件包括cat_ske.json（骨骼配置)、cat_tex.json (图集配置)、cat_tex.png (图集图片)三部分组成。目前全局换肤基于不同的猫使用的 **骨骼配置** 和 **图集配置**都是相同的，然后通过替换纹理图片达到全局换肤的目的。
### 2.创建流程
1. 可以通过编辑器拖拽的方式加载
2. 可以通过代码动态创建

### 3.全局换装
1. 全局换装主要是使用replaceTexture来进行替换纹理图。需要注意的是两张图必须配置文件和图片位置都一样才能进行全局换装。由于ccc没有实现浏览器版本的，所以必须在真机上测试，真机上js-binding的代码也需要修改一下。具体实现代码：
```
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
```
2. js-binding的代码修改，找到 `Resources/cocos2d-x/cocos/scripting/js-bindings/auto/jsb_cocos2dx_dragonbones_auto.cpp`文件**2034**行。修改为：
```
    static bool js_cocos2dx_dragonbones_Armature_replaceTexture(se::State& s)
    {
        dragonBones::Armature* cobj = (dragonBones::Armature*)s.nativeThisObject();
        SE_PRECONDITION2(cobj, false, "js_cocos2dx_dragonbones_Armature_replaceTexture : Invalid Native Object");
        const auto& args = s.args();
        size_t argc = args.size();
        CC_UNUSED bool ok = true;
        if (argc == 1) {
            void* arg0 = nullptr;
            ok &= seval_to_native_ptr(args[0], &arg0);  // 主要是修改的这里，官方没有取arg0这个参数
            #pragma warning NO CONVERSION TO NATIVE FOR void*
            SE_PRECONDITION2(ok, false, "js_cocos2dx_dragonbones_Armature_replaceTexture : Error processing arguments");
            cobj->replaceTexture(arg0);
            return true;
        }
        SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
        return false;
    }

```

###4. 局部换装

```
let rurl = cc.url.raw("resources/dragon_res/clo_3.png");
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

```
