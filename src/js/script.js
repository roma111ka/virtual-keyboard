import Keyboard from './Keyboard.js';
import { createDomNode } from './createDomNodeScript.js';

const BODY = document.querySelector('body');
const KEYBOARD = new Keyboard();


/*creat page*/ 
const createHeader = () =>{
    const HEADER = createDomNode('header', '', 'header');
    const WRAPPER = createDomNode('div','','wrapper');
    WRAPPER.append(createDomNode('h1', 'RS School Virtual Keyboard', 'header__title'));
    HEADER.append(WRAPPER);
    BODY.append(HEADER);
}

/*create main page */
const createMainPage = () =>{
    const KEYBOARD__SECTION = createDomNode('section', '', 'keyboard__section');
    const WRAPPER = createDomNode('div','','wrapper');
    WRAPPER.append(createDomNode('textarea','','textfield'));
    WRAPPER.append(KEYBOARD.generateKeyBoard());
    KEYBOARD__SECTION.append(WRAPPER);
    BODY.append(KEYBOARD__SECTION);
}
/* create footer */

const createFooter = () =>{
    const FOOTER = createDomNode('footer','','footer');
    const WRAPPER = createDomNode('div','','wrapper');
    const FooterContainer = createDomNode('div','','footer__container')
    FooterContainer.append(createDomNode('p', 'Для переключения раскладки языка комбинация: левые Shift + Ctrl', 'footer_subtitle'));
    FooterContainer.append(createDomNode('p', 'Клавиатура создана для операционной системы Windows', 'footer_subtitle'));
    WRAPPER.append(FooterContainer);
    FOOTER.append(WRAPPER);
    BODY.append(FOOTER);
}
/* buttons */


const keyEvent = (event, btn, codeEvent ) =>{
    const textField = document.querySelector('.textfield');
    let symbol = '';
    let cursor = textField.selectionStart;
    event.preventDefault();
    textField.focus();
    console.log(event);
    if (codeEvent === 'CapsLock') KEYBOARD.changeCapsLock(event);
    if (codeEvent === 'ShiftLeft' || codeEvent === 'ShiftRight') KEYBOARD.updateKeyboard(event);
    if (btn.dataset.noType !== 'true') {
        console.log("active");
       
        symbol = btn.textContent;
        KEYBOARD.removeShift(event);
    }
    if (codeEvent  === 'Tab') symbol = '    ';
    if (codeEvent  === 'Enter') symbol = '\n';
    if (codeEvent  === 'Backspace') symbol = '-1';
    if (codeEvent  === 'Delete') symbol = '+1';

    if (codeEvent === 'ArrowLeft' && cursor > 0) textField.setSelectionRange(cursor - 1, cursor - 1);
    if (codeEvent === 'ArrowRight') {
      cursor = textField.selectionEnd;
      textField.setSelectionRange(cursor + 1, cursor + 1);
    }
  
    if (codeEvent === 'ArrowUp') {
      const SymbolBeforeCursor = textField.value.substring(0, cursor).split('\n');
      if (SymbolBeforeCursor.length === 1 || SymbolBeforeCursor[SymbolBeforeCursor.length - 1].length >= 55) {
        cursor -= 55;
      } else if (SymbolBeforeCursor[SymbolBeforeCursor.length - 1].length <= SymbolBeforeCursor[SymbolBeforeCursor.length - 2].length % 55) {
         cursor -= (SymbolBeforeCursor[SymbolBeforeCursor.length - 2].length % 55) + 1;
      } else {
        cursor -= SymbolBeforeCursor[SymbolBeforeCursor.length - 1].length + 1;
      }
      if (cursor < 0) cursor = 0;
      textField.setSelectionRange(cursor, cursor);
    }
  
    if (codeEvent === 'ArrowDown') {
      cursor = textField.selectionEnd;
      const symbolBeforeCursor = textField.value.substring(0, cursor).split('\n');
      const symbolAfterCursor = textField.value.substring(textField.selectionEnd).split('\n');
      if (symbolAfterCursor.length === 1 || symbolAfterCursor[0].length >= 55) {
        cursor += 55;
      } else if ((symbolBeforeCursor[symbolBeforeCursor.length - 1].length % 55)
      > symbolAfterCursor[1].length) {
        cursor += symbolAfterCursor[0].length + symbolAfterCursor[1].length + 1;
      } else if ((((symbolBeforeCursor[symbolBeforeCursor.length - 1].length) + symbolAfterCursor[0].length) > 57)) {
        cursor += symbolAfterCursor[0].length;
      } else {
        cursor += (symbolBeforeCursor[symbolBeforeCursor.length - 1].length % 57) + symbolAfterCursor[0].length + 1;
      }
      textField.setSelectionRange(cursor, cursor);
    }

  
    if(symbol){
        let symbolBeforeCursor = textField.value.substring(0, cursor);
        let symbolAfterCursor = textField.value.substring(textField.selectionEnd);
        if (symbol === '-1') {
            symbol = '';
            if (cursor === textField.selectionEnd) {
              symbolBeforeCursor = symbolBeforeCursor.slice(0, -1);
              cursor -= (cursor > 0) ? 2 : 1;
            } else cursor -= 1;
        }
        if (symbol === '+1') {
            symbol = '';
            if (cursor === textField.selectionEnd) {
              symbolAfterCursor = symbolAfterCursor.slice(1);
            }
            cursor -= 1;
          }
        textField.value = symbolBeforeCursor + symbol + symbolAfterCursor;
        textField.setSelectionRange(cursor + 1, cursor + 1);
        if (symbol === '    ') textField.setSelectionRange(cursor + 4, cursor + 4);
    }
  
};
/* events */
document.addEventListener('keyup', (event) => {
    console.log("happyUP");
    const BUTTON = document.querySelector(`[data-code=${event.code}]`);
    if (BUTTON) {
        BUTTON.classList.remove('active');
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            KEYBOARD.removeShift(event);
            KEYBOARD.updateKeyboard(event);
        }
    }
});


document.addEventListener('keydown', (event) => {
    const BUTTON = document.querySelector(`[data-code=${event.code}]`);
    if (BUTTON) {
        BUTTON.classList.add('active');
        keyEvent(event, BUTTON, event.code);
    }
});
document.addEventListener('click', (event) => {
    if (event.target.closest('.key__btn')) {
      const BUTTON = event.target.closest('.key__btn');
      if (BUTTON.dataset.code === 'ShiftLeft' || BUTTON.dataset.code === 'ShiftRight') {
        KEYBOARD.shift = !KEYBOARD.shift;
        BUTTON.classList.toggle('active');
      }
      keyEvent(event, BUTTON, BUTTON.dataset.code);
    }
  });

window.onload = () =>{
    createHeader();
    createMainPage();
    createFooter();
}