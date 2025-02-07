class WishPool {
    constructor() {
        this.wishes = this.loadWishes();
        this.initEventListeners();
        this.renderWishes();
    }

    loadWishes() {
        const savedWishes = localStorage.getItem('wishes');
        return savedWishes ? JSON.parse(savedWishes) : [];
    }

    saveWishes() {
        localStorage.setItem('wishes', JSON.stringify(this.wishes));
    }

    addWish(wish) {
        this.wishes.push({
            ...wish,
            id: Date.now(),
            completed: false,
            completionDate: null
        });
        this.saveWishes();
        this.renderWishes();
    }

    toggleWishCompletion(id) {
        const wish = this.wishes.find(w => w.id === id);
        if (wish) {
            wish.completed = !wish.completed;
            wish.completionDate = wish.completed ? new Date().toISOString() : null;
            this.saveWishes();
            this.renderWishes();
        }
    }

    renderWishes() {
        const container = document.querySelector('.wishes-container');
        container.innerHTML = '';

        this.wishes.forEach(wish => {
            const wishElement = document.createElement('div');
            wishElement.className = `wish-item ${wish.completed ? 'completed' : ''}`;
            wishElement.innerHTML = `
                <h3>${wish.title}</h3>
                <p>${new Date(wish.date).toLocaleDateString()}</p>
            `;
            wishElement.onclick = () => this.showWishDetails(wish);
            container.appendChild(wishElement);
        });
    }

    showWishDetails(wish) {
        const modal = document.getElementById('wishDetailsModal');
        document.getElementById('modalWishTitle').textContent = wish.title;
        document.getElementById('modalWishDate').textContent = 
            `许愿日期：${new Date(wish.date).toLocaleDateString()}`;
        document.getElementById('modalWishDescription').textContent = wish.description;
        
        const checkbox = document.getElementById('wishCompleted');
        checkbox.checked = wish.completed;
        checkbox.onchange = () => this.toggleWishCompletion(wish.id);

        const completionDate = modal.querySelector('.completion-date');
        completionDate.textContent = wish.completed ? 
            `实现日期：${new Date(wish.completionDate).toLocaleDateString()}` : '';

        modal.classList.add('show');
    }

    initEventListeners() {
        const makeWishBtn = document.querySelector('.make-wish-btn');
        const wishModal = document.getElementById('wishModal');
        const wishForm = document.getElementById('wishForm');
        const closeButtons = document.querySelectorAll('.close-button');

        makeWishBtn.onclick = () => wishModal.classList.add('show');

        closeButtons.forEach(button => {
            button.onclick = () => {
                button.closest('.modal').classList.remove('show');
            };
        });

        wishForm.onsubmit = (e) => {
            e.preventDefault();
            const wish = {
                title: document.getElementById('wishTitle').value,
                description: document.getElementById('wishDescription').value,
                date: document.getElementById('wishDate').value
            };
            this.addWish(wish);
            wishForm.reset();
            wishModal.classList.remove('show');
        };

        // 点击模态框外部关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            };
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WishPool();
}); 