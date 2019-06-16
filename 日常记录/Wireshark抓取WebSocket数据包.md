最近在看WebSocket的开源项目，通过抓包了解一下WebSocket的交互流程。

### 准备工作
1. Wireshark抓环回链路数据包（即服务器和客户端都在本机）需要监听`Loopback:lo0`，因为本机发完本机的数据包不会经过网卡,而是经过环回链路返回本机。
2. 抓取websocket数据报，选择过滤方式`tcp.port == 8080 && (http || websocket)`，这样http升级包都能看到。