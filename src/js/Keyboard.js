import keysData from './keysDataset.js';
import { createDomNode } from './createDomNodeScript.js';

export default class Keyboard {
    constructor(){
        this.lang = 'ru';
        this.caps = false;
        this.shift = false;
    }

    updateKeyboard(event) {
        const { lang } = this.lang;
        if (event.shiftKey || this.shift) {
          document.querySelectorAll('.key__btn').forEach((e) => {
            if (e.dataset[`${lang}Shift`]) {
              if (this.caps === true) {
                e.innerHTML = e.dataset[`${lang}Shift`].toLowerCase();
              } else e.innerHTML = e.dataset[`${lang}Shift`];
            } else if (e.dataset[lang]) e.innerHTML = e.dataset[lang];
          });
        } else {
          document.querySelectorAll('.key__btn').forEach((e) => {
            if (e.dataset[lang]) {
              if (this.caps === true && !(event.shiftKey || this.shift)) {
                e.innerHTML = e.dataset[lang].toUpperCase();
              } else e.innerHTML = e.dataset[lang];
            }
          });
        }
      }

    removeShift(event) {
        if (this.shift) {
          this.shift = !this.shift;
          document.querySelector('.key_leftshift').classList.remove('active');
          document.querySelector('.key_rightshift').classList.remove('active');
          this.updateKeyboard(event);
        }
      }
    changeCapsLock(event) {
       this.caps === true ? this.caps = false: this.caps = true;
       this.updateKeyboard(event);
     }   

    generateKeyBoard(){
        const KEYBOARD = createDomNode('div', '', 'keyboard');
        const KEYBOARD_CONTAINER = createDomNode('div', '', 'keyboard__container')

        for (let i = 0; i < keysData.length; i++) {

           const KEYS_ROW = createDomNode('div', '', 'keyboard__row');
           keysData[i].forEach((element) => {
               const keyLabel = (element.key.ru) ? element.key[this.lang] : element.key; //
               console.log(keyLabel)
               const KEY_BTN  = createDomNode('div', keyLabel, 'key__btn');
               if(element.class){
                   KEY_BTN.classList.add(element.class);
               }
               KEY_BTN.dataset.code = element.code;
               KEYS_ROW.append(KEY_BTN);
           });
           KEYBOARD_CONTAINER.append(KEYS_ROW);
        }
        KEYBOARD.append(KEYBOARD_CONTAINER);
        return KEYBOARD;
    }
}