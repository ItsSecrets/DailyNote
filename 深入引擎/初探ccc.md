>1. Cocos Creator 的引擎部分包括 JavaScript、Cocos2d-x-lite 和 adapter 三个部分。

### 1.JavaScript
####    1.js引擎的生成步骤参考[官方文档](https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html)的引擎定制流程。
1. 安装gulp，具体gulp的使用可以参看[文档](https://gulpjs.com/docs/en/getting-started/quick-start)
2. 在引擎目录下安装所需依赖 `npm install`
3. 执行 `gulp build`编译引擎。引擎文件会生成到bin目录下，包括 **cocos2d-js-for-preview.js**(主要给h5使用) 、**jsb_polyfill.js**、**jsb_polyfill-for-preview.js**、**jsb_polyfill.dev.js**(后面三个主要是原生的)。
4. `_ccsg`下的内容主要是用来控制渲染的。定义在 `engine/index.js`下面。主要是用来控制渲染的。可以看一下定义：
    ```
    /**
    * !#en
    * The main namespace of Cocos2d-JS, all engine core classes, functions, properties and constants are defined in this namespace.
    * !#zh
    * Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。
    * @module cc
    * @main cc
    */
    cc = {};

    // The namespace for original nodes rendering in scene graph.
    _ccsg = {};
    ```
    其中`_ccsg`命名空间主要包括下面这些内容：
    ```
    window._ccsg = {
            Node: cc.Node,
            Scene: cc.Scene,
            Sprite: cc.Sprite,
            ParticleSystem: cc.ParticleSystem,
            Label: cc.Label,
            EditBox: cc.EditBox,
            VideoPlayer: cc.VideoPlayer,
            WebView: cc.WebView,
            TMXTiledMap: cc.TMXTiledMap,
            TMXObjectGroup: cc.TMXObjectGroup,
            TMXObject: cc.TMXObject,
            TMXObjectImage: cc.TMXObjetImage,
            TMXObjectShape: cc.TMXObjectShape,
            TMXLayer: cc.TMXLayer,
            MotionStreak: cc.MotionStreak,
            CameraNode: cc.CameraNode
        };
    ```
    `_ccsg`的内容的定义会区分web平台和原生平台。web平台的`_ccsg.Node`等内容指向的都是与之对应的CCSGNode等内容。原生平台`_ccsg`下的内容是在`engine/jsb/jsb-etc.js`中配置的，都是指向的原生C++的内容，如上面示例所示。

5. 编译选项都在 **engine/gulpfile.js** 中配置。
    web平台的编译选项配置如下：
    ```
    gulp.task('build-html5-preview',  function (done) {
        Engine.buildPreview('./index.js', './bin/cocos2d-js-for-preview.js', done);
    });
    ```
    获取寻找`engine`根目录下的`index.js`，它包含这写内容：
    ```
    // LOAD COCOS2D ENGINE CODE
    if (CC_EDITOR && Editor.isMainProcess) {
        cc._initDebugSetting(1);    // DEBUG_MODE_INFO
    }
    else {
        require('./cocos2d/shaders');
        require('./CCBoot');
        require('./cocos2d');
    }
    ```
    其中，在`./cocos2d/index.js`目录下会包含CCSG相关的web平台的内容。此时打包编译会把web平台需要的内容编译到`cocos2d-js-for-preview.js`文件中。
    原生平台的配置如下：
    ```
    gulp.task('build-jsb-preview',  function (done) {
        Engine.buildJsbPreview([
            './jsb/index.js',
        ], './bin/jsb_polyfill-for-preview.js', [], done);
    });
    ```
    这里会去寻找`engine/jsb/index.js`,然后这里面会require`engine/jsb/jsb-etc.js`，其中在`jsb-etc.js`会设置CCSG相关的原生平台的内容。
    通过以上操作，根据不同的配置，编译不同的引擎源码。



### 3.Cocos2d-x-lite