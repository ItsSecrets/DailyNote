//
//  Shader.hpp
//  LearnOpenGL
//
//  Created by zwf on 2019/1/21.
//  Copyright © 2019 zwf. All rights reserved.
//

#ifndef Shader_hpp
#define Shader_hpp

#include <stdio.h>
#include <glad/glad.h>
#include <iostream>
#include <fstream>
#include <sstream>

class Shader{
    
    
public:
    //程序ID
    unsigned int ID;
    //构造函数
    Shader(const GLchar*vertexPath, const GLchar*fragmentPath);
    
    //激活程序
    void use();
    
    // uniform工具函数
    void setBool(const std::string &name, bool value) const;
    void setInt(const std::string &name, int value) const;
    void setFloat(const std::string &name, float value) const;
private:
    void checkCompileErrors(unsigned int shader, std::string type) 
    {
        int success;
        char infoLog[1024];
        if (type != "PROGRAM")
        {
            glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
            if (!success)
            {
                glGetShaderInfoLog(shader, 1024, NULL, infoLog);
                std::cout << "ERROR::SHADER_COMPILATION_ERROR of type: " << type << "\n" << infoLog << "\n -- --------------------------------------------------- -- " << std::endl;
            }
        }
        else
        {
            glGetProgramiv(shader, GL_LINK_STATUS, &success);
            if (!success)
            {
                glGetProgramInfoLog(shader, 1024, NULL, infoLog);
                std::cout << "ERROR::PROGRAM_LINKING_ERROR of type: " << type << "\n" << infoLog << "\n -- --------------------------------------------------- -- " << std::endl;
            }
        }
    }
};


#endif /* Shader_hpp */
