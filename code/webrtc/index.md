### webrtc中文网：https://webrtc.org.cn/webrtc-tutorial-2-signaling-stun-turn/

### WebRTC 传输基本知识

1. NAT（Network Address Translator）: 将内网地址 映射 为 外网地址（包括端口）

2. STUN（Simple Traveral of UDP Through NAT）: 中介（交换 两个设备的外网地址）

3. TURN（Traversal Using Relays around NAT） :（在 p2p 连接不成功的情况下） 云端服务器，双端数据转发

4. ICE（Interactive Connectivity Establishment）: Trough NAT 与 TRUN 打包在一起， 首先尝试 p2p，p2p 不同的时候，通过 TURN 中转，（TURN节点有多个，在多个节点中找寻一个最优路径选择连接）

### NAT 产生原因

1. 由于 IPv4 地址不够

2. 出于网络安全的原因

### 内部地址（iAddr:port1）映射到外部地址（eAddr:port2）

### STUN 协议 将 NAT 分类

1. 完全锥型 NAT（Full Cone NAT）： 一旦一个内部地址（iAddr:port1）映射到外部地址（eAddr:port2），所有发自iAddr:port1的包都经由eAddr:port2向外发送。任意外部主机都能通过给eAddr:port2发包到达iAddr:port1

2. 地址限制锥型 NAT （Address Restricted Cone NAT ）：一旦一个内部地址（iAddr:port1）映射到外部地址（eAddr:port2），所有发自iAddr:port1的包都经由eAddr:port2向外发送。任意外部主机（hostAddr:any）都能通过给eAddr:port2发包到达iAddr:port1的前提是：iAddr:port1之前发送过包到hostAddr:any. "any"也就是说端口不受限制（其实就是内部必须发送过包的IP地址，才能向这个eAddr:port2发送包）

3. 端口限制锥型 NAT （Port Restricted Cone NAT ）：一旦一个内部地址（iAddr:port1）映射到外部地址（eAddr:port2），所有发自iAddr:port1的包都经由eAddr:port2向外发送。一个外部主机（hostAddr:port3）能够发包到达iAddr:port1的前提是：iAddr:port1之前发送过包到hostAddr:port3.（在上一条的基础上增加了发送过包的IP地址+端口）

4. 对称型 NAT （Symmetric NAT） ：来自相同内部ip和port发送到相同目的地ip和port的请求被映射到唯一的外部ip和port地址；如果相同的内部主机采用相同的ip和port地址发送到不同的目的地，那么重新分配映射地址。

### NAT 穿越（Traversal） 原理

1. C1 、C2 向 STUN 发消息

2. 交换公网 IP 及 端口

3. C1->C2, C2->C1,甚至是端口猜测

### STUN 作用：

1. 主要功能是检测是否位于NAT后面，如果位于NAT后面，经过NAT转换后的地址和端口是什么，另外可以检测NAT的类型。

2. 参考： https://blog.csdn.net/commander_officer/article/details/8881119


### STUN 和 TURN

1. STUN服务器是用来获取外部地址的。
2. TURN服务器是用来在直接连接（点到点）失败的情况下进行中继数据流量的，TURN用于中继对等端之间的音频/视频/数据流，而不是信令数据

