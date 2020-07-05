# router 用于内部页面的链接跳转

### 链接路径如下:

/ -> SiderDemo(page 1)

/SiderDemo -> SiderDemo(page 1)

/SiderDemo/Mylogin -> Mylogin (可以看作是SiderDemo的下级菜单，会出现在页面的下方)

/MyRegister -> MyRegister     (SiderDemo、MyRegister等属于同一级，因此链接的时候会刷新覆盖)

/SiderTwo -> SiderTwo(page 2)

/SiderTwoCopy -> SiderTwoCopy   (一个页面似乎不能有两个内容不一样的Drawer？待解决)(为了实现两个Drawer,写了另一个页面)



index.js可以认为是主页面

在这里完成的是router的设置，其它内容都是在单独的.js里面完成的

单独的.js都放在component文件夹中，每个内容是一个.js&.css ,互相之间的引用通过import {class name}来完成

