document.addEventListener('DOMContentLoaded', () => {
    const chips = document.querySelectorAll('.mat-chip-overlay');
    const card  = document.querySelector('.hero__card');
    const note  = document.getElementById('matNote');

    const notes = {
        leather:    'Материал: натуральная кожа — тёплая, мягкая, «дышит».',
        alcantara:  'Материал: алькантара — матовая, не скользит, премиальный вид.',
        ecoleather: 'Материал: экокожа — износостойкая, простой уход, выгодная цена.',
        nappa:      'Материал: Наппа — мягчайшая премиальная кожа с минимальной обработкой.',
        carbon:     'Материал: Карбон — стильные вставки для спортивного характера руля.'
    };

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // 1. Убираем активность со всех кнопок
            chips.forEach(c => { 
                c.classList.remove('is-active'); 
                c.setAttribute('aria-pressed', 'false'); 
            });
            
            // 2. Делаем активной нажатую кнопку
            chip.classList.add('is-active');
            chip.setAttribute('aria-pressed', 'true');

            // 3. Меняем цвет акцента в правой карточке
            const color = chip.dataset.color;
            card.style.setProperty('--accent', color);
            chip.style.setProperty('--active-color', color);

            // 4. Плавно меняем текст описания
            note.style.opacity = 0;
            setTimeout(() => { 
                note.textContent = notes[chip.dataset.material]; 
                note.style.opacity = 1; 
            }, 150);
        });
    });
});
// Плавное появление формы при загрузке
const formCard = document.querySelector('.form-card');
if (formCard) {
  formCard.style.opacity = '0';
  formCard.style.transform = 'translateY(20px)';
  formCard.style.transition = 'opacity .6s ease, transform .6s ease';
  requestAnimationFrame(() => {
    setTimeout(() => {
      formCard.style.opacity = '1';
      formCard.style.transform = 'translateY(0)';
    }, 50);
  });
}

// Всплывающее сообщение после отправки (заглушка)
const form = document.querySelector('.callback-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Заявка отправлена!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
}
// ===== ФИЛЬТРАЦИЯ ПОРТФОЛИО =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Убираем активный класс у всех кнопок
        filterBtns.forEach(b => b.classList.remove('is-active'));
        // 2. Добавляем активный класс нажатой кнопке
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        // 3. Фильтруем элементы
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hidden');
            }
        });
    });
});