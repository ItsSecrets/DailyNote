#include "Window.hpp"
#include <iostream>
int main(int argc, const char * argv[]) {
#pragma test window
    Window* _window = new Window(800, 600, (GLchar*)"Hello Window");
    _window->render();

    return 0;
}



