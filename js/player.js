// 使用立即执行函数来避免全局命名空间污染
(() => {
    class MusicPlayer {
        constructor() {
            this.songs = [
                {
                    name: '下雨天',
                    artist: '南拳妈妈',
                    url: '/Users/zhangxu/网页/music/下雨天.mp3',
                    cover: 'images/covers/下雨天.jpg'
                },
                {
                    name: '太聪明',
                    artist: '陈绮贞',
                    url: '/Users/zhangxu/网页/music/陈绮贞-太聪明.mp3',
                    cover: 'images/covers/太聪明.jpg'
                },
                {
                    name: '特别的人',
                    artist: '方大同',
                    url: '/Users/zhangxu/网页/music/方大同 - 特别的人.mp3',
                    cover: 'images/covers/特别的人.jpg'
                },
                {
                    name: '天天',
                    artist: '陶喆',
                    url: '/Users/zhangxu/网页/music/陶喆-天天.mp3',
                    cover: 'images/covers/天天.jpg'
                },
                {
                    name: '几分之几',
                    artist: '卢广仲',
                    url: '/Users/zhangxu/网页/music/卢广仲-几分之几.mp3',
                    cover: 'images/covers/几分之几.jpg'
                }
            ];
            
            this.initPlayer();
            this.initEventListeners();
        }
        
        initPlayer() {
            this.ap = new APlayer({
                container: document.getElementById('aplayer'),
                mini: false,
                autoplay: false,
                theme: '#ff9ecd',
                loop: 'all',
                order: 'list',
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                listFolded: false,
                listMaxHeight: 90,
                audio: this.songs
            });

            // 添加错误处理
            this.ap.on('error', (e) => {
                console.error('音频加载错误:', e);
                console.log('出错的歌曲:', this.songs[this.ap.list.index]);
            });
        }
        
        initEventListeners() {
            const playlist = document.querySelector('.playlist');
            playlist.addEventListener('click', (e) => {
                const item = e.target.closest('.playlist-item');
                if (item) {
                    const songIndex = Array.from(playlist.children).indexOf(item);
                    this.playSong(songIndex);
                    
                    // 更新播放列表高亮
                    const items = document.querySelectorAll('.playlist-item');
                    items.forEach((item, i) => {
                        item.classList.toggle('active', i === songIndex);
                    });
                }
            });
        }
        
        playSong(index) {
            this.ap.list.switch(index);
            this.ap.play();
        }
    }

    // 在 DOM 加载完成后初始化
    document.addEventListener('DOMContentLoaded', () => {
        new MusicPlayer();
    });
})(); 