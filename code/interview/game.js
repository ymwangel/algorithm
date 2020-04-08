var startPage = {
    isUse: true | false,  // 是否使用开始页面
    backgroundImage: ['pc', 'app'], //背景图片 pc和app的
    backgroundMusic: '' //背景音乐
}

var baseInfo = {
    title: '', //游戏标题
    introduction: '', //游戏说明
    audioTip: '', //语音说明
    backgroundImage: ['pc', 'app'], //背景图片 pc和app的
}

var element = {
    type: '', //type分为：主元素、障碍元素、挖空宫格、拾取元素、终点,
    image: '', //元素图片
    backgroundImage: '', //元素背景图片
    moveMusic: '', //移动音效
    collisionMusic: '', //撞墙音效
    text: '', //元素文案：主元素、障碍元素、挖空宫格、拾取元素、终点
    direction: '' // 只有主观素才有，默认是 up 或 right，可配置
}
var elements = [element]

var content = {
    size: { //游戏宫格
        w: Number, 
        h: Number
    },
    backgroundImage: '', //游戏背景图片
    squareBox: [{
        position: '42', //宫格位置，4->D:y轴、2->横轴
        element: element || null , //null时为空白，初始状态
    }]
}

var signal = {
    type: '', //重复、拾取、前进(只有前进，方向由direction决定)
    direction: '', //left、right、up、down
    step: Number, //步数
}

var feedback = {
    successMusic: '', //成功音效
    failMusic: '', //失败音效
    successUrl: '', //成功图片
    failUrl: '' //失败图片
}

/**
 * 问题：
 * 1. 当 主元素 超越边界，不能走了，在原地动画
 * 2.
 */