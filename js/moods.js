class MoodCalendar {
    constructor() {
        this.currentDate = new Date();
        // 设置起始日期为2025年2月
        this.minDate = new Date(2025, 1, 1); // 2025年2月1日
        this.selectedDate = null;
        this.moods = new Map();
        // 模拟两个用户
        this.users = {
            me: '我',
            you: '你'
        };
        this.init();
    }

    init() {
        this.loadMoods();
        this.renderCalendar();
        this.attachEventListeners();
    }

    loadMoods() {
        // 这里可以从localStorage或后端加载保存的心情数据
        const savedMoods = localStorage.getItem('moods');
        if (savedMoods) {
            this.moods = new Map(JSON.parse(savedMoods));
        }
    }

    saveMoods() {
        localStorage.setItem('moods', JSON.stringify([...this.moods]));
    }

    renderCalendar() {
        const calendar = document.getElementById('moodCalendar');
        const currentMonth = document.getElementById('currentMonth');
        
        // 如果当前显示的月份早于2025年2月，则设置为2025年2月
        if (this.currentDate < this.minDate) {
            this.currentDate = new Date(this.minDate);
        }
        
        calendar.innerHTML = '';
        currentMonth.textContent = `${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`;

        // 添加星期标题
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        weekDays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day weekday';
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        // 添加空白天数
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }

        // 添加日期
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateString = this.formatDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day));
            const dayMoods = this.moods.get(dateString);
            
            if (dayMoods) {
                dayElement.classList.add('has-mood');
            }

            dayElement.innerHTML = `
                <div class="day-number">${day}</div>
                ${dayMoods ? `
                    <div class="mood-display">
                        ${dayMoods.me ? `<span class="user-mood" data-user="我">${dayMoods.me.emoji}</span>` : ''}
                        ${dayMoods.you ? `<span class="user-mood" data-user="你">${dayMoods.you.emoji}</span>` : ''}
                    </div>
                ` : ''}
            `;
            
            dayElement.setAttribute('data-date', dateString);
            calendar.appendChild(dayElement);
        }
    }

    attachEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            const newDate = new Date(this.currentDate);
            newDate.setMonth(newDate.getMonth() - 1);
            // 只有当新日期不早于2025年2月时才更新
            if (newDate >= this.minDate) {
                this.currentDate = newDate;
                this.renderCalendar();
            }
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('moodCalendar').addEventListener('click', (e) => {
            const dayElement = e.target.closest('.calendar-day');
            if (dayElement && !dayElement.classList.contains('empty') && !dayElement.classList.contains('weekday')) {
                this.selectedDate = dayElement.getAttribute('data-date');
                this.showMoodModal();
            }
        });

        // 弹窗相关事件
        document.querySelector('.close-button').addEventListener('click', () => {
            this.hideMoodModal();
        });

        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        document.getElementById('saveMood').addEventListener('click', () => {
            this.saveMoodEntry();
        });
    }

    showMoodModal() {
        const modal = document.getElementById('addMoodModal');
        modal.classList.add('show');
    }

    hideMoodModal() {
        const modal = document.getElementById('addMoodModal');
        modal.classList.remove('show');
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('moodNote').value = '';
    }

    saveMoodEntry() {
        const selectedMood = document.querySelector('.mood-btn.selected');
        if (!selectedMood) return;

        const emoji = selectedMood.getAttribute('data-mood');
        const note = document.getElementById('moodNote').value;

        let dayMoods = this.moods.get(this.selectedDate) || {};
        dayMoods.me = { emoji, note };
        this.moods.set(this.selectedDate, dayMoods);

        this.saveMoods();
        this.renderCalendar();
        this.hideMoodModal();
    }

    formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    // 如果有加载图片或其他资源的地方
    saveMoodImage() {
        const imagePath = `/love-memories/images/moods/${date}.jpg`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MoodCalendar();
}); 