import { TRIGGER_EVENTS, CLASSNAME } from './constants';
import { readCookie, cookiesEnabled, shouldExecute } from './utils';
// import apply from './apply';

const initUI = settings => {
    document.body.firstElementChild.insertAdjacentHTML('beforebegin', settings.template(settings));
    const fields = [].slice.call(document.querySelectorAll(`.${settings.classNames.field}`));
    const banner = document.querySelector(`.${settings.classNames.banner}`);
    const btn = document.querySelector(`.${settings.classNames.btn}`);

    TRIGGER_EVENTS.forEach(ev => {
        btn.addEventListener(ev, e => {
            if(!shouldExecute(e)) return;     
            applyConsent(settings, fields.reduce((acc, field) => { return acc[field.value] = field.checked, acc }, {}));
            // banner.parentNode.removeChild(banner);
        });
    });
};

const applyConsent = (settings, consent) => {
    console.log(settings, consent);
    // Object.keys(consent).forEach(key => {
    //     consent[key] && apply[key] && apply[key].forEach(fn => fn(settings, consent));
    // });
};

export default settings => {
    if(!cookiesEnabled()) return;
    console.log(settings);

    const cookies = readCookie(settings);
    
    if(!cookies) initUI(settings);
    else applyConsent(settings, JSON.parse(cookies.value));

};