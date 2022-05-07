import keysData from './keysDataset.js';
import { createDomNode } from './createDomNodeScript.js';

export default class Keyboard {
    constructor(){
        this.lang = 'ru';
        this.caps = 'off';
        this.shift = false;
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

               KEYS_ROW.append(KEY_BTN);
           });
           KEYBOARD_CONTAINER.append(KEYS_ROW);
        }
        KEYBOARD.append(KEYBOARD_CONTAINER);
        return KEYBOARD;
    }
}