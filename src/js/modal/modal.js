import ChatAPI from '../api/ChatAPI';
import Chat from '../Chat';

export default class Modal {
  constructor(container) {
    this.container = container;
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <div class="modal__form">
        <div class="modal__background">
            <div class="modal__content">
                <div class="modal__header"></div>
                <div class="modal__body">
                    <form class="form__group">
                        <label class="form__label">Выберите псевдоним</label>
                        <div class="form__hint"></div>
                        <input class="form__input"></input>
                        <button class="chat__connect">Продолжить</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
      `;
  }

  bindToDom() {
    this.container.innerHTML = Modal.markup;
    const modal = document.querySelector('.modal__form');
    modal.classList.add('active');

    const form = document.querySelector('.form__group');

    form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('.form__input');
    const hint = document.querySelector('.form__hint');
    const modal = document.querySelector('.modal__form');
    const callback = (status, data) => {
      if (status !== 'ok') {
        hint.textContent = data.message;
      } else {
        const chat = new Chat(this.container, data.user);
        chat.init();
        chat.onLeaveChatHandler();
        modal.classList.remove('active');
      }
    };

    const cahtAPI = new ChatAPI();
    cahtAPI.create(
      {
        name: form.value,
      },
      callback,
    );
  }
}
