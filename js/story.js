class Story {
    constructor() {
        this.startDate = new Date('2024-09-30');
        this.initDaysCounter();
        this.loadSpecialDays();
        // 每秒更新一次计数器
        setInterval(() => this.updateDaysCounter(), 1000);
    }

    initDaysCounter() {
        this.updateDaysCounter();
    }

    updateDaysCounter() {
        const now = new Date();
        const diffTime = now - this.startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
        
        const counter = document.getElementById('daysCount');
        const timeDetails = document.querySelector('.time-details');
        
        counter.textContent = diffDays;
        timeDetails.textContent = `${diffHours}小时 ${diffMinutes}分钟 ${diffSeconds}秒`;
    }

    loadSpecialDays() {
        // 使用与日历相同的特殊日期数据
        fetch('js/calendar.js')
            .then(response => response.text())
            .then(text => {
                // 提取特殊日期数据
                const specialDaysData = this.extractSpecialDaysData(text);
                this.renderTimeline(specialDaysData);
            });
    }

    extractSpecialDaysData(text) {
        // 这里简化处理，实际项目中可能需要更复杂的解析
        return {
            '2024-09-30': {
                title: '第一次相遇',
                description: '凌晨心情不好刷抖音，第一次刷到小t子直播呢，在外面看了好一会儿看到九月点进去了，运气很好的中了所有福袋',
                emoji: '✨'
            },
            // ... 其他日期数据 ...
        };
    }

    renderTimeline(specialDays) {
        const timeline = document.querySelector('.timeline');
        const sortedDates = Object.entries(specialDays)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

        sortedDates.forEach(([date, data], index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.style.animationDelay = `${index * 0.1}s`;

            const formattedDate = new Date(date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            item.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${formattedDate}</div>
                    <div class="timeline-title">
                        <span class="timeline-emoji">${data.emoji}</span>
                        <h3>${data.title}</h3>
                    </div>
                    <p class="timeline-description">${data.description}</p>
                </div>
            `;

            timeline.appendChild(item);
        });
    }
}

class SweetMessages {
    constructor() {
        this.messages = [
            { text: "你笨笨的样子，我其实真的觉得很可爱", emoji: "(≧▽≦)" },
            { text: "有时候看你做事慢吞吞的，我就会笑，觉得你真是太可爱啦", emoji: "(˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣)" },
            { text: "你偶尔的小迷糊，真的让人觉得很萌哦", emoji: "( •̀ ω •́ )✧" },
            { text: "每次看到你傻傻的笑，我心里都觉得特别温暖", emoji: "*^ω^)" },
            { text: "你说话有点傻傻的，但是很真实，这就是我喜欢的样子", emoji: "٩(◕‿◕｡)۶" },
            { text: "你每天都这么可爱，真的是让人心情大好", emoji: "(｡•́‿•̀｡)" },
            { text: "看到你傻乎乎的样子，忍不住笑出来", emoji: "(｡♥‿♥｡)" },
            { text: "每次看到你嘟嘴的时候，真的是超级可爱", emoji: "(⺣◡⺣)♡*" },
            { text: "就算你有点笨笨的，我也觉得特别治愈", emoji: "(｡•́ - •̀｡)" },
            { text: "你就是我的小可爱，每天都想陪着你", emoji: "(灬º‿º灬)♡" },
            { text: "每当你笑的时候，我的心就像是被治愈了一样", emoji: "(♡°▽°♡)" },
            { text: "就算你偶尔迷糊，我还是喜欢你的那种可爱感", emoji: "(｡•̀ᴗ•́｡)" },
            { text: "你真的很会让我笑，尤其是那些傻乎乎的瞬间", emoji: "(⌒‿⌒)" },
            { text: "你今天怎么这么可爱，忍不住想捏捏你的脸", emoji: "(つ✧ω✧)つ" },
            { text: "看你认真的样子也特别可爱哦，真想一直看着你", emoji: "(●´ω｀●)" }
        ];
        
        this.messageBox = document.querySelector('.sweet-message-box');
        this.messageText = document.querySelector('.message-text');
        this.messageEmoji = document.querySelector('.message-emoji');
        
        this.showRandomMessage();
        this.startMessageInterval();
    }
    
    getRandomMessage() {
        const index = Math.floor(Math.random() * this.messages.length);
        return this.messages[index];
    }
    
    showRandomMessage() {
        const message = this.getRandomMessage();
        this.messageText.textContent = message.text;
        this.messageEmoji.textContent = message.emoji;
        
        this.messageBox.classList.add('show');
        this.messageBox.classList.add('animate');
        
        setTimeout(() => {
            this.messageBox.classList.remove('animate');
        }, 5000);
    }
    
    startMessageInterval() {
        setInterval(() => {
            this.showRandomMessage();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Story();
    new SweetMessages();
}); 