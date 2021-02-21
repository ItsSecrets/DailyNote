### 描述
* 开发一个h5活动，用到了cocoscreator，需要要自定义loading加载界面。

### 方案
1. 通过官方文档提供的定制项目构建流程里面的[自定义发布模版](https://docs.cocos.com/creator/2.3/manual/zh/publish/custom-project-build-template.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8F%91%E5%B8%83%E6%A8%A1%E7%89%88),在项目路径下添加一个 build-templates 目录
2. 因为我只用到`web-mobile`平台，所以只需要把之前build/web-mobile/下的index.html,main.js,splash.png,style-mobile.css 拷贝到`build-templates/web-mobile/`下面即可
3. 然后根据需要修改html和css文件，每次构建都会从这个模板去构建了


### 有问题欢迎指正，探讨