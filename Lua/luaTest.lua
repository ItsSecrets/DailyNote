-- require ('functions')


--[[
    Lua查找一个表元素时的规则，其实就是如下3个步骤:
    1.在表中查找，如果找到，返回该元素，找不到则继续
    2.判断该表是否有元表，如果没有元表，返回nil，有元表则继续。
    3.判断元表有没有__index方法，如果__index方法为nil，则返回nil；
    如果__index方法是一个表，则重复1、2、3；如果__index方法是一个函数，则返回该函数的返回值。
]]
local t = {
    ["b"] = "b"
}
t.__index = t

local t1  = {
    ['1'] = "1",
    ['key'] = "2",
    ['a'] = "a",    
}
t1.__index = t1
setmetatable(t1, t)

local t2 = {
    [1] = "1",
    [2] = "1",
    [3] = "1",
    [4] = "1",
}
print("------------", collectgarbage('count'), "------------")
print(#t1)
print(#t2)
print(t2["ley"])
setmetatable(t2, t1)
print(t2["a"])
print(t2["b"])
collectgarbage("collect")
print('------------', collectgarbage('count'), '------------')

function printTbl(tbl)
    for index, value in ipairs(tbl) do
        print(value)
    end
end

function selectSort(tbl)
    local minIndex
    for i = 1, #tbl do
        minIndex = i
        for j=i+1,#tbl do
            if tbl[minIndex] > tbl[j] then
                minIndex = j
            end
        end
        tbl[minIndex], tbl[i] = tbl[i], tbl[minIndex]
    end

    return tbl
end
local tbl = {1,7,9,3,2,5,4,6}
printTbl(selectSort(tbl))

