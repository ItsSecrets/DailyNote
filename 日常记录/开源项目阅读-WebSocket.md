
### 链接流程

#### 三次握手
TCP建立连接时，会有三次握手过程。
##### 1. 第一次握手
客户端向服务端发送连接请求包。

##### 2. 第二次握手
服务器收到客户端发过来的TCP报文，由SYN=1知道客户端要求建立联机，向客户端发送一个SYN=1，ACK=1的TCP报文，将确认序号设置为客户端的序列号加1。

##### 3. 第三次握手
客户端接收到服务器发过来的包后检查确认序列号是否正确，即第一次发送的序号+1，以及标志位ACK是否为1。若正确则再次发送确认包，ACK标志为1。链接建立成功，可以发送数据了

#### HTTP请求
WebSocket 复用了 HTTP 的握手通道。具体指的是，客户端通过 HTTP 请求与 WebSocket 服务端协商升级协议。协议升级完成后，后续的数据交换则遵照 WebSocket 的协议。
##### 1. 客户端：申请协议升级
首先发起协议升级请求，请求头如下：
```
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: Upgrade           //表示要升级协议
Host: localhost:8081
Origin: http://localhost:8081
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: NPLRG36B3TNsM8iSIGxDZg== //与后面服务端响应首部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
Sec-WebSocket-Version: 13     //表示 websocket 的版本。如果服务端不支持该版本，需要返回一个Sec-WebSocket-Versionheader，里面包含服务端支持的版本号。
Upgrade: websocket            //表示要升级到 websocket 协议
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36
```

##### 2. 服务端：响应协议升级
收到客户端请求，状态代码101表示协议切换。服务端响应如下：
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: LUnjZANPPSU7YEwbKepfmGy2aHc=
```

##### 3. Sec-WebSocket-Accept 的计算
`Sec-WebSocket-Accept`是一个随机的经过base64编码的字符串，像密钥一样用于服务器和客户端的握手过程。一旦服务器君接收到来自客户端的upgrade请求，便会将请求头中的“Sec-WebSocket-Key”字段提取出来，追加一个固定c串：258EAFA5-E914-47DA-95CA-C5AB0DC85B11，并进行SHA-1加密，然后再次经过base64编码生成一个新的key，作为响应头中的“Sec-WebSocket-Accept”字段的内容返回给客户端。一旦客户端接收到来自服务器的响应，便会解析响应中的“Sec-WebSocket-Accept”字段，与自己加密编码后的串进行匹配，一旦匹配成功，便有建立连接。


计算公式为：
1. 将Sec-WebSocket-Key跟`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`拼接。
2. 通过 SHA1 计算出摘要，并转成 base64 字符串。


### websocket数据帧格式

WebSocket协议中，数据是通过数据帧来传递的，协议规定了数据帧的格式，服务端要想给客户端推送数据，必须将要推送的数据组装成一个数据帧，这样客户端才能接收到正确的数据；同样，服务端接收到客户端发送的数据时，必须按照帧的格式来解包，才能真确获取客户端发来的数据。

[RFC文档](https://tools.ietf.org/html/rfc6455#section-5.2)中对帧的格式定义如下所示：

      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+

最上方的第二排数字，每个数字表示一个bit位，这个可以用来确定数据帧格式的每一部分占用的bit位数。

#### 1. FIN

1个bit位，用来标记当前数据帧`是不是最后一个数据帧`，因为一个消息可能会分成多个数据帧来传递，当然，如果只需要一个数据帧的话，第一个数据帧也就是最后一个。

#### 2. RSV1, RSV2, RSV3

这三个，各占用一个bit位，根据RFC的介绍，这三个bit位是用做扩展用途，没有这个需求的话设置位0。

#### 3. Opcode

故名思议，操作码，占用4个bit位，也就是一个16进制数，它用来描述要传递的数据是什么或者用来干嘛的，只能为下面这些值：

0x0 denotes a continuation frame 标示当前数据帧为分片的数据帧，也就是当一个消息需要分成多个数据帧来传送的时候，需要将opcode设置位0x0。

0x1 denotes a text frame 标示当前数据帧传递的内容是文本

0x2 denotes a binary frame 标示当前数据帧传递的是二进制内容，不要转换成字符串

0x8 denotes a connection close 标示请求关闭连接

0x9 denotes a ping 标示Ping请求

0xA denotes a pong 标示Pong数据包，当收到Ping请求时自动给回一个Pong

目前协议中就规定了这么多，0x3~0x7以及0xB~0xF都是预留作为其它用途的。

#### 4. MASK

占用一个bit位，`标示数据有没有使用掩码`，RFC中有说明，服务端发送给客户端的数据帧不能使用掩码，客户端发送给服务端的数据帧必须使用掩码。

如果一个帧的数据使用了掩码，那么在Maksing-key部分必须是一个32个bit位的掩码，用来给服务端解码数据。

#### 5. Payload len

`数据的长度`，默认位7个bit位。

如果数据的长度小于125个字节（注意：是字节）则用默认的7个bit来标示数据的长度。

如果数据的长度为126个字节，则用后面相邻的2个字节来保存一个16bit位的无符号整数作为数据的长度。

如果数据的长度大于126个字节，则用后面相邻的8个字节来保存一个64bit位的无符号整数作为数据的长度。

#### 6. Masking-key 0 or 4 bytes

数据掩码，如果MASK设置位0，则该部分可以省略，如果MASK设置位1，Masking-key位一个32位的掩码。payload-data字段的数据需要经这个掩码进行解密。

#### 7. Payload data

该部分，也是最后一部分，是帧`真正要发送的数据`，可以是任意长度。它是"Extension data"和"Application data"的总和，一般扩展数据为空。

#### 8. Extension data: x bytes

除非扩展被定义，否则就是0，任何扩展必须指定其Extension data的长度

#### 9. Application data: y bytes

占据"Extension data"之后的剩余帧的空间

#### websocket接受发送数据
* frame-fin; 长度为1 bit
* frame-rsv1; 长度为1 bit
* frame-rsv2; 长度为1 bit
* frame-rsv3; 长度为1 bit
* frame-opcode; 长度为4 bit
* frame-masked; 长度为1 bit
* frame-payload-length; 长度为7或者7+16或者7+64 bit
* [frame-masking-key]; 长度为32 bit
* frame-payload-data; 长度为大于0的n*8 bit（其中n>0）

#### 1. 客户端到服务端添加掩码
masked字段为1， Masking-key用于对帧负载数据Payload data字段中的包含Extension data和Application data的数据进行添加掩码。

掩码字段是一个由客户端随机选择的32bit的值。当准备掩码帧时，客户端必须从允许的32bit值中须知你咋一个新的掩码值。掩码值必须是不可被预测的；掩码不影响Payload data的长度。

#### 2. 数据帧的解析和编码
##### 1. 数据帧的解析
```
function decodeDataFrame(e) {
    console.log("======>>>>",e);
    
    var i = 0, j, s, frame = {
        //解析前两个字节的基本数据
        FIN: e[i] >> 7, 
        Opcode: e[i++] & 0x0f, //1111
        Mask: e[i] >> 7,
        PayloadLength: e[i++] & 0x7F//1111111
    };
    //处理特殊长度126和127
    if (frame.PayloadLength == 126)
        frame.PayloadLength = (e[i++] << 8) + e[i++];
    if (frame.PayloadLength == 127)
        i += 4, //长度一般用四字节的整型，前四个字节通常为长整形留空的
            frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    //判断是否使用掩码
    if (frame.Mask) {
        //获取掩码实体
        frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        //对数据和掩码做异或运算
        for (j = 0, s = []; j < frame.PayloadLength; j++)
        {
            s.push(e[i + j] ^ frame.MaskingKey[j % 4]);
        }
            
    } else {
        s = e.slice(i, frame.PayloadLength); //否则直接使用数据
    }
    //数组转换成缓冲区来使用
    s = new Buffer(s);
    //如果有必要则把缓冲区转换成字符串来使用
    if (frame.Opcode == 1) s = s.toString();
    //设置上数据部分
    frame.PayloadData = s;
    //返回数据帧
    return frame;
}
```
##### 2. 数据帧的解析编码
```
function encodeDataFrame(e) {
    var s = [], o = new Buffer(e.PayloadData), l = o.length;
    //输入第一个字节
    s.push((e.FIN << 7) + e.Opcode);
    //输入第二个字节，判断它的长度并放入相应的后续长度消息
    //永远不使用掩码
    if (l < 126) s.push(l);
    else if (l < 0x10000) s.push(126, (l & 0xFF00) >> 8, l & 0xFF);
    else s.push(
        127, 0, 0, 0, 0, //8字节数据，前4字节一般没用留空
        (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 8, l & 0xFF
    );
    //返回头部分和数据部分的合并缓冲区
    return Buffer.concat([new Buffer(s), o]);
}
```
##### 3. 消息分片
WebSocket的每条消息可能被切分成多个数据帧。当WebSocket的接收方收到一个数据帧时，会根据FIN的值来判断，是否已经收到消息的最后一个数据帧。
FIN=1表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。FIN=0，则接收方还需要继续监听接收其余的数据帧。
此外，opcode在数据交换的场景下，表示的是数据的类型。0x01表示文本，0x02表示二进制。而0x00比较特殊，表示延续帧（continuation frame），顾名思义，就是完整消息对应的数据帧还没接收完。

##### 4. 断开连接


### 使用
#### 1. Symbol的使用

    1. Symbol值作为属性名时，该属性还是公开属性，不是私有属性。
    2. 应用场景：
        1. 背包中的家具加入场景中是设置的临时ID可以使用
        2. Event事件。是否可以用Symbol包装成 `Symbol("功能描述")`

#### 2. `Object.defineProperty(object, propertyname, descriptor)` 定义属性

    1. 参数
        1. object 必需。 要在其上添加或修改属性的对象。 这可能是一个本机 JavaScript对象（即用户定义的对象或内置对象）或 DOM 对象。
        2. propertyname 必需。 一个包含属性名称的字符串。
        3. descriptor 必需。 属性描述符。 它可以针对数据属性或访问器属性。
        
>* value: 属性的值，默认undefined
>* configurable: 默认为false，true表示当前属性是否可以被改变或者删除，其中”改变“是指属性的descriptor的配置项configurable、enumerable和writable的修改
>* enumerable：默认为false，true表示当前属性能否被for...in或者Objectk.keys语句枚举
>* writable：默认为false，true表示当前属性的值可以被赋值重写
>* get：默认undefined，获取目标属性时执行的回调方法，该函数的返回值作为该属性的值
>* set：默认undefined，目标属性的值被重写时执行的回调
    
    2. 应用场景：
        1. 通过 `set`方法根据数据刷新场景内容
        2. cocos引擎和一些前端框架的双向数据绑定通过这个实现


#### 3. 利用bit标识标记地板占用情况？

#### 4. `Object.assign`的使用，控制默认参数

```
    Object.assign(
        {
        binary: typeof data !== 'string',
        mask: !this._isServer,
        compress: true,
        fin: true
        },
        options
    );
```

#### 5. 消息分片的主要用在什么地方？养成的homeGet能不能使用？



















### 二进制位运算符知识扩展：

#### >> 含义是右移运算符，
右移运算符是将一个二进制位的操作数按指定移动的位数向右移动，移出位被丢弃，左边移出的空位一律补0.
比如 11 >> 2, 意思是说将数字11右移2位。
首先将11转换为二进制数为 0000 0000 0000 0000 0000 0000 0000 1011 , 然后把低位的最后2个数字移出，因为该数字是正数，
所以在高位补零，则得到的最终结果为：0000 0000 0000 0000 0000 0000 0000 0010，转换为10进制是2.

#### << 含义是左移运算符
    左移运算符是将一个二进制位的操作数按指定移动的位数向左移位，移出位被丢弃，右边的空位一律补0.
比如 3 << 2, 意思是说将数字3左移2位，
首先将3转换为二进制数为 0000 0000 0000 0000 0000 0000 0000 0011 , 然后把该数字高位(左侧)的两个零移出，其他的数字都朝左平移2位，
最后在右侧的两个空位补0，因此最后的结果是 0000 0000 0000 0000 0000 0000 0000 1100，则转换为十进制是12(1100 = 1*2的3次方 + 1*2的2字方)