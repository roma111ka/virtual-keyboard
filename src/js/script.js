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

window.onload = () =>{
    createHeader();
    createMainPage();
    createFooter();
}