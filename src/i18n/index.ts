import { createI18n } from 'vue-i18n';
import { zhTW, enGB, enUS, zhCN } from './languages';

const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'zhCN',
    legacy: true,
    messages: {
        zhCN: zhCN,
        zhTW: zhTW,
        enUS: enUS,
        enGB: enGB
    }
});

export default i18n;
