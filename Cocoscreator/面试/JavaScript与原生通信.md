> 参考[链接](https://oedx.github.io/2019/05/29/cocos-creator-js-binding-manual/)
# 1.  jsb 有参数调用java 层与oc 层 callStaticMethod
```
if(cc.sys.os == cc.sys.OS_ANDROID){
    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "CopyStrtoClipboard", "(Ljava/lang/String;)V",szString);
}else if (cc.sys.os == cc.sys.OS_IOS){
   jsb.reflection.callStaticMethod("AppController", "copyClipboard:",szString);
}
```

# 2. java层调用cocos creator 层 evalString
```
Cocos2dxJavascriptJavaBridge.evalString("cc.vv.anysdkMgr.onJavatoCreator("+ msg + ")"); 函数名加传入的参数
```

# 3. oc 层调用 cocos creator 层
```
std::string  jsCallStr = cocos2d::StringUtils::format("cc.vv.anysdkMgr.onJavatoCreator(\'%s\');", msg.c_str());
se::ScriptEngine::getInstance()->evalString(jsCallStr.c_str());
```