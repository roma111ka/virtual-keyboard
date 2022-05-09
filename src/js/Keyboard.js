import keysData from './keysDataset.js';
import { createDomNode } from './createDomNodeScript.js';

export default class Keyboard {
    constructor(){
        this.lang = 'ru';
        this.caps = false;
        this.shift = false;
    }

    updateKeyboard(event) {
        if (event.shiftKey || this.shift) {
            
            document.querySelectorAll('.key__btn').forEach((e) => {
              if (e.dataset[`${this.lang}Shift`]) {
                  console.log("z pfitk 123")
                if (this.caps === true) {
                  e.innerHTML = e.dataset[`${this.lang}Shift`].toLowerCase();
                } else e.innerHTML = e.dataset[`${this.lang}Shift`];
              } else if (e.dataset[this.lang]) {
                  e.innerHTML = e.dataset[this.lang];
                  console.log(e.innerHTML)
                }
            });
          } else {
           console.log(1)
            document.querySelectorAll('.key__btn').forEach((e) => {
              if (e.dataset[this.lang]) {
                  console.log("z pfitk")
                if (this.caps === true && !(event.shiftKey || this.shift)) {
                  e.innerHTML = e.dataset[this.lang].toUpperCase();
                } else {
                    e.innerHTML = e.dataset[this.lang];
                }
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
       this.caps === true ? this.caps = false : this.caps = true;
       console.log(this.caps)
       this.updateKeyboard(event);
     }   

     changeLanguage(event){
        this.lang === 'en' ? this.lang === 'ru' : this.lang === 'en';
        localStorage.setItem('lang', this.lang);
        this.updateKeyboard(event);
     }

     loadLang(){
        localStorage.getItem('lang') ?  this.lang = localStorage.getItem('lang') : localStorage.setItem('lang', this.lang);
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
               if (element.key.ru && element.key.en) {
                    KEY_BTN.dataset.ru = element.key.ru;
                    KEY_BTN.dataset.en = element.key.en;
               }
               if (element.shift) {
                    KEY_BTN.dataset.ruShift = element.shift.ru;
                    KEY_BTN.dataset.enShift = element.shift.en;
                }
              if (element.noType) {
                    KEY_BTN.dataset.noType = true;
              }
               KEYS_ROW.append(KEY_BTN);
           });
           KEYBOARD_CONTAINER.append(KEYS_ROW);
        }
        KEYBOARD.append(KEYBOARD_CONTAINER);
        return KEYBOARD;
    }
}