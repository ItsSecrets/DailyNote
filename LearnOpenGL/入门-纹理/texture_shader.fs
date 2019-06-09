
#version 330 core
out vec4 FragColor;

in vec3 ourColor;
in vec2 TexCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;

void main()
{

    FragColor = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5);
    
    //图像翻转
//    FragColor = mix(texture(texture1, TexCoord), texture(texture2, vec2(1.0-TexCoord.x, 1.0-TexCoord.y)), 0.5);
}
