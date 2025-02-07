class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.specialDays = new Map();
        this.init();
    }

    init() {
        this.loadSpecialDays();
        this.renderCalendar();
        this.attachEventListeners();
    }

    loadSpecialDays() {
        const specialDaysData = {
            '2024-09-30': {
                title: '第一次相遇',
                description: '凌晨心情不好刷抖音第一次刷到小t子直播呢，在外面看了好一会儿看到九月点进去了，运气很好的中了所有福袋',
                emoji: '✨'
            },
            '2024-10-02': {
                title: '兔耳朵截图',
                description: '截图到了特别可爱的兔耳朵比耶',
                emoji: '🐰',
                type: 'cute-moment'
            },
            '2024-10-13': {
                title: '熊猫舞 & 加微信',
                description: '跳了熊猫舞哈哈哈哈，其实还蛮可爱的，也是今天加了vx，其实之前从来没有想过会有那么多联系呢，之前只只觉得是个会逗粉丝开心的清秀小女孩',
                emoji: '🐼',
                type: 'dance'
            },
            '2024-10-23': {
                title: '抖音一号',
                description: '刷了我人生第一个抖音一号哦',
                emoji: '🏆',
                type: 'achievement'
            },
            '2024-11-04': {
                title: '萌萌照',
                description: '给你画了很可爱的和九月、二宝的萌萌照',
                emoji: '🎨',
                type: 'art'
            },
            '2024-11-06': {
                title: '第一首歌 & 古茗兼职',
                description: '点了第一首歌《下雨天》很不自信啊，一直说自己会唱跑调，唱歌难听，才没有呢！貌似也是你在古茗兼职的第一天 （劝你不要去非要去！现在看看我是不是都很聪明，完美预判了每一个事情发生的结果）那段时间貌似一直等你下班，我是不是很好！就怕你情绪崩溃啊',
                emoji: '🎵',
                type: 'music'
            },
            '2024-11-11': {
                title: '网吧直播',
                description: '网吧直播 拍了特别萌的手势舞',
                emoji: '💃',
                type: 'dance'
            },
            '2024-11-12': {
                title: '星际玫瑰',
                description: '户外直播 送了你之前提过一嘴的很喜欢的礼物-星际玫瑰 后面因为一直不回我弹幕回别人的，狼狈逃出直播间哈。。。。',
                emoji: '🌹',
                type: 'gift'
            },
            '2024-11-14': {
                title: '歌声 & 自画像',
                description: '好吧！12号没听到的歌今天听到了 真的，看到以前的录屏好感慨啊 唱歌特别羞涩不敢唱 现在唱什么歌都信手拈来了 真好！甘大师的自画像也是今天发给我了（这次再忘了寄揍你 我怀疑你已经忘了这件事了）',
                emoji: '🎨',
                type: 'art'
            },
            '2024-11-22': {
                title: '横屏直播',
                description: '第一次横屏直播 很帅啊！（这件衣服真的就穿了一次啊！我记不得不怪我吧！但浅色真的很衬你啊）',
                emoji: '📺',
                type: 'stream'
            },
            '2024-12-02': {
                title: '星守护',
                description: '星守护的第一天 我的第一个 你的第一个！',
                emoji: '⭐',
                type: 'milestone'
            },
            '2024-12-05': {
                title: '大衣直播',
                description: '大衣直播 很帅啊 少被他人的话搞得自己不自信好嘛',
                emoji: '👔',
                type: 'stream'
            },
            '2024-12-09': {
                title: '九月视频',
                description: '特别可爱的小视频！九月好萌',
                emoji: '🐱',
                type: 'video'
            },
            '2024-12-15': {
                title: '满展馆',
                description: '第一次满展馆～',
                emoji: '🎮',
                type: 'achievement'
            },
            '2024-12-17': {
                title: '游戏初体验',
                description: '第一次打游戏 还是头一次教人打游戏呢 很有天赋呀！又满展馆啦！小展馆变大展馆',
                emoji: '🎮',
                type: 'game'
            },
            '2025-01-01': {
                title: '一起跨年',
                description: '一起跨年啦 第一次和那么多人跨年呢',
                emoji: '🎆',
                type: 'milestone'
            },
            '2025-01-27': {
                title: '直播日',
                description: '在姐姐家直播很帅的一天',
                emoji: '📱',
                type: 'stream'
            },
            '2025-01-28': {
                title: '压岁钱',
                description: '发压岁钱啦',
                emoji: '🧧',
                type: 'gift'
            },
            '2025-01-29': {
                title: '新年快乐',
                description: '你是我第一个说新年快乐的人哦，也是第一个我发压岁钱的！抖音一号终于出现在大展馆上了，以前送都看不到',
                emoji: '🎊',
                type: 'milestone'
            },
            '2025-01-31': {
                title: '舞蹈录屏',
                description: '你会后悔你跳的那些舞哈哈哈哈我全录屏了，以前相册空空荡荡的，现在都是截图和录屏哦',
                emoji: '📸',
                type: 'dance'
            },
            '2025-02-04': {
                title: '16级！',
                description: '16级啦！卡在23:59的尾巴',
                emoji: '🎯',
                type: 'achievement'
            },
            '2025-02-05': {
                title: '宇宙之心',
                description: '我从来没想过我会爱一个离我那么远的人那么久哦，我的一颗宇宙之心我的第一个16级。看了你的录屏真的特别好看啊，特别感谢你这段时间的陪伴，也包容我很多莫名其妙的脾气。不过我就是一个内心很敏感的人！你经常突然不见我真的很伤心的OK？说着说着人没了，几个小时后再出现的时候我真的很不想理你！我脾气真好哼哼',
                emoji: '💖',
                type: 'milestone'
            }
        };

        Object.entries(specialDaysData).forEach(([date, data]) => {
            this.specialDays.set(date, data);
        });
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const currentMonth = document.getElementById('currentMonth');
        
        calendar.innerHTML = '';
        currentMonth.textContent = `${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`;

        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        weekDays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day weekday';
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateString = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            if (this.specialDays.has(dateString)) {
                const specialDay = this.specialDays.get(dateString);
                dayElement.classList.add('special-day');
                dayElement.setAttribute('data-date', dateString);
                dayElement.innerHTML = `
                    <span class="day-number">${day}</span>
                    <span class="day-emoji">${specialDay.emoji}</span>
                `;
            } else {
                dayElement.textContent = day;
            }

            calendar.appendChild(dayElement);
        }
    }

    attachEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('calendar').addEventListener('click', (e) => {
            if (e.target.classList.contains('special-day')) {
                const date = e.target.getAttribute('data-date');
                this.showDayDetails(date);
            }
        });
    }

    showDayDetails(date) {
        const specialDay = this.specialDays.get(date);
        if (specialDay) {
            const modal = document.getElementById('dayDetailsModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalEmoji = document.getElementById('modalEmoji');
            const modalDescription = document.getElementById('modalDescription');
            
            modalTitle.textContent = specialDay.title;
            modalEmoji.textContent = specialDay.emoji;
            modalDescription.textContent = specialDay.description;
            
            modal.classList.add('show');
            
            const closeButton = modal.querySelector('.close-button');
            const closeModal = () => {
                modal.classList.remove('show');
            };
            
            closeButton.onclick = closeModal;
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            };
        }
    }

    loadSpecialDayImage(date) {
        return `images/special/${date}.jpg`;
    }
} 