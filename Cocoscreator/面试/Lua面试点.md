# 1. Lua继承机制
lua中其实是没有类的，有的只是表(table)，而类之间的继承也就是将父类的表连到了一起，派生类中没有找到的属性和方法就通过元表查找父类。

## 1. __index元方法
按照之前的说法，如果A的元表是B，那么如果访问了一个A中不存在的成员，就会访问查找B中有没有这个成员。这个过程大体是这样，但却不完全是这样，实际上，即使将A的元表设置为B，而且B中也确实有这个成员，返回结果仍然会是nil，原因就是`B的__index元方法没有赋值`。按照我的理解， __index方法是用来确定一个表在被作为元表时的查找方法 。这么说有点绕。所以：
```
father = {
	house=1
}
son = {
	car=1
}
setmetatable(son, father) --把son的metatable设置为father
print(son.house)
```
输出的结果是nil，但如果把代码改为
```
father = {
	house=1
}
father.__index = father -- 把father的__index方法指向自己
son = {
	car=1
}
setmetatable(son, father)
print(son.house)
```
输出的结果为1，符合预期   

结合上例，来解释__index元方法的含义：  
访问son.house时，son中没有house这个成员，但Lua接着发现son有元表father，于是此时father被当做元表来查找，此时，Lua并不是直接在father中找名为house的成员，而是调用father的__index方法，如果__index方法为nil，则返回nil，如果是一个表（上例中father的__index方法等于自己，就是这种情况），那么就到__index方法所指的这个表中查找名为house的成员，于是，最终找到了house成员。
注：__index方法除了可以是一个表，还可以是一个函数，如果是一个函数，__index方法被调用时将返回该函数的返回值。

## 2. Lua查找一个表元素时的规则，其实就是如下3个步骤:
1.在表中查找，如果找到，返回该元素，找不到则继续  
2.判断该表是否有元表，如果没有元表，返回nil，有元表则继续  
3.判断元表有没有__index方法，如果__index方法为nil，则返回nil；如果__index方法是一个表，则重复1、2、3；如果__index方法是一个函数，则返回该函数的返回值  