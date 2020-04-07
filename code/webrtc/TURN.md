### 搭建STUN、TURN服务器
1. clone coturn ： https://github.com/coturn/coturn
2. cd coturn
3. ./configure --prefix=/usr/local/coturn (保证 /usr/loca/coturn 目录存在)
4. 报错：OpenSSL Crypto development libraries are not installed properly in required location.
![image](/Users/wangyanmin/workspace/algorithm/code/webrtc/coturn-error-openssl.png)
5. cd ..
6. clone openssl： https://github.com/openssl/openssl
7. cd openssl
8. ./config --prefix=/usr/local/coturn 
9. make
10. sudo make install
11. cd ../coturn
10. 重复步骤 3 , 报错：Libevent2 development libraries are not installed properly in required 
location.
![image](/Users/wangyanmin/workspace/algorithm/code/webrtc/coturn-error-libevent.png)
11. cd ..
12. 下载 libevent： https://sourceforge.net/projects/levent/
13. 解压文件，然后使得  coturn仓库、openssl仓库、libevent 仓库都在统一目录下
14. cd libevent 
15. ./configure --prefix=/usr/local/coturn
16. make
17. sudo make install
18. cd ../coturn
19. 尝试 步骤 3 出现：Makefile created: success. 表示安装编译 coturn 成功

20. coturn仓库下：ls -alt Makefile  : -rw-r--r--  1 wangyanmin  staff  13098  4  6 12:17 Makefile
21. make -j 8
22. sudo make install
23. cd /usr/local/coturn , ls (目录如下) : bin     etc     include lib     man     share   ssl     var
24. 
