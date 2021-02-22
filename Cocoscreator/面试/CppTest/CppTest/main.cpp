//
//  main.cpp
//  CppTest  测试指针常量 和 常量指针
//
//  Created by zwf on 2021/2/21.
//  Copyright © 2021 zwf. All rights reserved.
//

#include <iostream>
using namespace std;
#include <stdio.h>
char message1[] = "Hello";   //常量指针
char *message2 = "Hello";    //指针常量

int main()
{
    //message1++; // ERR
    message2++;

    message1[0] = 'h';
    //*(message2+1) = 'h'; // ERR

    printf("message1 = %s \n", message1);
    printf("message2 = %s \n", message2);
    
    message2 = "Hello message2";   // 指针常量，改变指向内容
    printf("message2 = %s \n", message2);

    return 0;
}
