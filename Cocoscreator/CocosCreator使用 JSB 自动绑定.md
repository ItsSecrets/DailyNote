> 方法总结主要来自[官方文档](https://docs.cocos.com/creator/manual/zh/advanced-topics/jsb-auto-binding.html)

# 1. 环境配置
## 1. `python`是自带的，直接安装这两个库就行。
```
sudo pip install PyYAML
sudo pip install Cheetah
```
`Cheetah`通过pip 安装可能失败，可以本地安装，下载[地址](http://pythonhosted.org//Cheetah/),然后解压，在解压目录执行`sudo python setup.py install`即可

## 2. NDK
这个直接去官网下载配置就行，一开始用的`r10e`报错了， 正好还有一个`r16b`，换过来就过去了。

# 2.  ini 配置
这个配置最好拿引擎已有的来改，一开始用的文档里的改的，出现一个错误没搞定。然后直接从引擎copy一份改的，很顺利。

# 3. 注册
正常编译完了，会在`cocos/scripting/js-bindings/auto`目录下生成对应的文件，然后需要去`jsb_module_register.cpp`中注册，就可以在JavaScript中使用了，注册如下：
```
// cocos2dx_test
se->addRegisterCallback(register_all_cocos2dx_test);
```

# 4. demo 
在CocosPro中的`TestJSBinding`场景下