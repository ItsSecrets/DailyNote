
#version 330 core
out vec4 FragColor;
in vec3 ourColor;
in vec3 ourPosition;

uniform vec4 uniformColor;
void main()
{
    //1.使用uniform传进来的颜色uniformColor
//    FragColor = uniformColor; //使用uniform传进来的颜色
    
    //2.使用通过填充VBO、配置顶点属性指针，并借用顶点着色器做媒介传递的颜色ourColor
    FragColor = vec4(ourColor,1.0f);
}
