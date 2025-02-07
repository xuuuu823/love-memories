class ChatSystem {
    constructor() {
        this.messageForm = document.getElementById('messageForm');
        this.messageInput = document.getElementById('messageInput');
        this.chatMessages = document.getElementById('chatMessages');
        
        // 关键词和对应的回复
        this.keywordReplies = {
            '生气': '不要生气啦，消消气，我给你讲个笑话好不好？',
            '哼哼': '小可爱在撒娇了吗？快让我好好哄哄你~',
            '加油': '对啊对啊，今天也要开开心心的！我永远支持你！',
            '干嘛': '在想你啊，不管做什么事都会想到你呢~',
            '忙': '辛苦啦！记得要适当休息，我一直都在你身边！',
            '不开心': '抱抱~不开心的事情说出来就会好很多，我永远在这里听你说',
            '睡不着': '我陪你聊天好不好？数星星也可以，直到你睡着为止',
            '谢谢': '这是我最想做的事啊，永远陪着你，永远爱你',
            '开心': '真好呀！你开心我也会很开心，说给我听好不好？',
            '想你': '我也在想你呢，每时每刻都想见到你(◍•ᴗ•◍)',
            '烦': '别烦恼啦，我陪你聊聊天，说不定就不烦了呢~',
            '难过': '不要难过，有我陪着你呢，一起度过这个时刻',
            '想见': '我也好想见你啊，下次见面一定要好好抱抱',
            '累': '辛苦了，休息一下吧，我给你讲个有趣的事',
            '无聊': '那我陪你玩啊，要不要猜猜我最喜欢你什么？',
            '想吃': '馋猫~下次我们一起去吃好吃的！',
            '好喜欢': '我也最喜欢你啦，每天都比昨天更喜欢一点',
            '想哭': '别哭别哭，让我抱抱，什么事都会过去的',
            '害怕': '不要怕，我永远都在你身边，一直陪着你',
            '紧张': '深呼吸，放轻松，你最棒了，一定没问题的！',
            '失眠': '数着星星入睡吧，我在这里陪着你',
            '想睡': '早点休息吧，我会守护你的美梦',
            '晚安': '晚安啦小可爱，愿你梦里都是我',
            '早安': '早安呀！今天也要元气满满哦~',
            '想聊天': '好啊，我最喜欢和你聊天了，说什么都开心',
            '好冷': '我给你一个大大的拥抱，这样就不冷了',
            '好热': '来吃个冰淇淋降降温吧~',
            '生病': '要好好照顾自己呀，我心疼了，要快点好起来',
            '想玩': '和你一起玩什么都开心，我陪你！',
            '想你了': '我也好想你，每分每秒都在想着你呢',
            '抱抱': '隔空给你一个大大的拥抱，感受到我的温暖了吗？',
            '亲亲': '么么哒~给你一个甜甜的亲亲',
            '饿': '要记得按时吃饭哦，饿着我心疼',
            '好吃': '下次带我一起去吃好不好？想尝尝你说的美食~',
            '喜欢你': '我也最最最喜欢你啦，喜欢到心都要融化了',
            '爱你': '我也爱你，比昨天更爱，比明天少爱',
            '想约': '好呀好呀，我等不及要见到你了',
            '不理我': '怎么会不理你呢，你是我最在意的人呀',
            '想抱': '张开双手，给你一个大大的拥抱',
            '委屈': '不委屈不委屈，说给我听好不好，我永远站在你这边',
            '想哄': '来，让我哄哄你，你永远是我最珍贵的小宝贝',
            '想逛街': '好啊，我陪你去买好看的衣服，你穿什么都好看',
            '想出去': '带你去看看外面的世界，感受生活的美好',
            '好无助': '别怕，我一直都在，永远是你最坚强的后盾',
            '好孤单': '有我陪着你呢，你永远不会孤单',
            '想依靠': '我的肩膀永远为你留着，累了就靠一靠',
            '想撒娇': '来吧来吧，我最喜欢你撒娇的样子了',
            '想发脾气': '发泄出来就好了，我永远包容你的一切',
            '好甜': '你才是最甜的那个，甜到我心里去了',
            '想笑': '你的笑容最好看了，我也跟着开心起来了',
            '想哭泣': '哭吧哭吧，我的怀抱永远为你敞开',
            '好感动': '你开心我也会感动，你的每个情绪我都懂',
            '想陪': '陪伴是最长情的告白，我愿意一直陪着你',
            '好幸福': '和你在一起的每一刻都很幸福，想一直这样下去',
            '想念': '我也在思念你，期待下次相见的每一天',
            '好想你': '我也好想好想你，每天都在数着见面的日子',
            '想拥抱': '张开双臂，给你一个温暖的拥抱',
            '心情不好': '让我陪你度过这个时刻，明天一定会更好的'
        };

        this.initEventListeners();
        
        // 添加欢迎消息
        setTimeout(() => {
            this.addMessage('你来啦！今天想和我聊点什么呢？', 'received');
        }, 500);
    }

    initEventListeners() {
        this.messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.messageInput.value.trim();
            if (message) {
                this.addMessage(message, 'sent');
                this.messageInput.value = '';
                
                // 添加延迟回复效果
                setTimeout(() => {
                    this.checkForAutoReply(message);
                }, 1000);
            }
        });
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    checkForAutoReply(message) {
        let hasReplied = false;
        
        // 检查消息中是否包含任何关键词
        for (const [keyword, reply] of Object.entries(this.keywordReplies)) {
            if (message.toLowerCase().includes(keyword)) {
                this.addMessage(reply, 'received');
                hasReplied = true;
                break;
            }
        }
        
        // 如果没有匹配的关键词，发送默认回复
        if (!hasReplied) {
            this.addMessage('正在努力升级哦', 'received');
        }
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatSystem();
}); 