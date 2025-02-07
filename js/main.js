document.addEventListener('DOMContentLoaded', () => {
    // 初始化日历
    const calendar = new Calendar();
    
    // 添加页面切换效果
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}); 

class MusicPlayer {
    constructor() {
        this.ap = new APlayer({
            container: document.getElementById('aplayer'),
            fixed: false,
            audio: [{
                url: '/love-memories/music/song1.mp3',
                name: '下雨天',
                artist: 'Artist 1',
                cover: '/love-memories/images/cover1.jpg'
            }]
        });
    }
} 