> 这个主要是做记录。

### 1. `File->New->Target`打开创建面板
### 2. 选择`macOS->Commond Line Tool`然后选择`C++`。然后输入Target名字，直接下一步就可以了。
### 3. 选择对应Target名字，在`Build Phases`导入`OpenGL.framework    libGLEW.2.0.0.dylib    libglfw3.3.2.dylib`这三个依赖库。
### 4. 选择对应Target名字，在`Compile Sources`导入`glad.c`文件。

> 至此，已经完成了新Targe 的创建。
