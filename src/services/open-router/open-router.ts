import store from '@/store'
import router from '@/router'

/**
   * 设置路由缓存
   */
const setCache = (pagePath: string, pageKey: string, tabTitle: string): void => {
    store.commit("routerCache/SET_ACTIVE_TAB_KEY", pageKey);
    store.commit("routerCache/ADD_ROUTER_CACHE", {
        key: pageKey,
        tabTitle: tabTitle,
        path: pagePath,
    });
};

/**
 * 路由跳转
 */
const openRouter = (pagePath: string, pageKey: string, tabTitle: string, needCache: boolean, openType?: number): void => {
    if(openType === 2) {
        const newWindow: any  = window.open("about:blank");
        newWindow.herf = pagePath;
    }else{
        router.push(pagePath);
        if(needCache) {
            setCache(pagePath, pageKey, tabTitle);
        }
    }
};


export default openRouter