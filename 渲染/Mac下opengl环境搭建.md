
## 明确概念

### OpenGL
    OpenGL一套API,就是说，包含同一个头文件，调用各个显卡厂商提供的驱动函数，就可以实现同样的功能。这套接口是Khronos这个组织在维护，怎么维护呢?就是写一个说明书，指导各个GPU厂家，如果他们要支持OpenGL的话，要怎么实现一个具体的OpenGL库。Khronos说要实现glDrawArray这个接口，那么厂家就得在他的库里实现这个接口。如果不实现，那么就不算支持OpenGL。也有一些接口不一定要实现。

### glew(OpenGL扩展库) 
    The OpenGL Extension Wrangler Library is a simple tool that helps C/C++ developers initialize extensions and write portable applications. GLEW currently supports a variety of operating systems, including Windows, Linux, Darwin, Irix, and Solaris.
    OpenGL扩展库是个简单的工具，用于帮助C/C++开发者初始化扩展（OpenGL扩展功能）并书写可移植的应用程序。GLEW当前支持各种各样的操作系统，包含Windows，Linux，Darwin，Irix与Solaris。

###  glad
    是一个开源的库，功能跟 GLEW 类似。GLAD 使用了一个在线服务（在这里能够告诉 GLAD 需要定义的 OpenGL 版本，并且根据这个版本加载所有相关的 OpenGL 函数）。是一个开源的库，功能跟 GLEW 类似。GLAD 使用了一个在线服务（在这里能够告诉 GLAD 需要定义的 OpenGL 版本，并且根据这个版本加载所有相关的 OpenGL 函数）。


### gult(OpenGL工具库 OpenGL Utility Toolkit)
    GLUT代表OpenGL应用工具包，英文全称为OpenGL Utility Toolkit，是一个独立于窗口系统的工具包，适合学习OpenGL和开发简单的OpenGL应用程序。

### glfw
    一个轻量级的，开源的，跨平台的library。专门针对 OpenGL 的 C 语言库，提供了渲染物体所需的最低限度的接口。其允许用户创建 OpenGL 上下文，定义窗口参数以及处理用户输入，把物体渲染到屏幕所需的必要功能。因为OpenGL没有窗口管理的功能，所以很多热心的人写了工具来支持这些功能，比如早期的glut，开发目的是用于替代glut的。

## 环境配置

### 安装glew和glfw
使用Mac下的包管理工具homebrew安装，安装命令如下：
```
    brew install glew
    brew install glfw
```
然后链接glew：
```
    brew link grew
```
通过brew命令安装的软件包都会在 `/usr/local/Cellar`,可以通过`brew list `查看。此时glew和glfw已经安装完成。

### xcode 配置
1. 然后创建一个新的Xcode项目（command line tool），语言选择C++。然后在`Bulid Settings`中找到`Header Search Paths` ,在里面添加两项：
    ```
    /usr/local/Cellar/glew/2.1.0/include 
    /usr/local/Cellar/glfw/3.2.1/include
    /usr/local/include
    ```
    然后找到`Library Search Paths`，在里面添加两项：
    ```
    /usr/local/Cellar/glfw/3.2.1/lib 
    /usr/local/Cellar/glew/2.1.0/lib
    ```
    上面完成头文件和依赖库文件搜索路径的添加。
    
2.  最后一步导入Framework 需要用到这三个`OpenGL.framework    libGLEW.2.0.0.dylib    libglfw3.3.2.dylib`。在`Build Phases`中找到`Linked Frameworks and Libraries`, 点击+导入，其中`OpenGL.framework`可以直接导入。`libGLEW.2.0.0.dylib    libglfw3.3.2.dylib`需要去对应目录下添加。

3. 至此，环境搭建完毕。

## 测试
配置好环境就可以开始测试了，测试代码：
```
#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>
 
void Render(void)
{
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    glBegin(GL_TRIANGLES);
    {
        glColor3f(1.0,0.0,0.0);
        glVertex2f(0, .5);
        glColor3f(0.0,1.0,0.0);
        glVertex2f(-.5,-.5);
        glColor3f(0.0, 0.0, 1.0);
        glVertex2f(.5, -.5);
    }
    glEnd();
}
 
int main(int argc, const char * argv[]) {
    GLFWwindow* win;
    if(!glfwInit()){
        return -1;
    }
    win = glfwCreateWindow(640, 480, "OpenGL Base Project", NULL, NULL);
    if(!win)
    {
        glfwTerminate();
        exit(EXIT_FAILURE);
    }
    if(!glewInit())
    {
        return -1;
    }
    glfwMakeContextCurrent(win);
    while(!glfwWindowShouldClose(win)){
        Render();
        glfwSwapBuffers(win);
        glfwPollEvents();
    }
    glfwTerminate();
    exit(EXIT_SUCCESS);
    return 0;
}
```
![cmd-markdown-logo](https://github.com/ItsSecrets/DailyNote/blob/master/image/WX20181226-140227.png?raw=true)























