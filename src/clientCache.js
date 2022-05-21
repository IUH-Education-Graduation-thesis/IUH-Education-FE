/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import Cookies from 'js-cookie';

class ClientCache {
  constructor() {
    this.token = '';
    this.i18nextLng = 'vi';
    this.expired_time = '';
    this.refresh_token = '';
    this.authorization = '';
    this.default_first_chapter = false;

    this.ROLE = 'role';
    this.CURRENT_EXAM_DETAIL = 'current_exam_detail';

    this.TOKEN_KEY = '__access__token__';
    this.PROFILE_USER = '__user__profile__';
    this.AUTHORIZATION = 'Authorization';
    this.TOKEN_EXPIRED_KEY = '__expired__time__';
    this.REFRESH_TOKEN_KEY = '__refresh__access__token__';
    this.DEFAULT_FIRST_CHAPTER = '__default__first__chapter';
  }

  // LocalStorage
  getAuthenTokenWithLocalStorage() {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem(this.TOKEN_KEY);
    this.token = token;
    return this.token;
  }

  // Cookies
  getAuthenTokenWithCookie() {
    if (typeof window === 'undefined') return;

    const token = Cookies.get(this.TOKEN_KEY);
    this.token = token;
    return this.token;
  }

  getExpiredTimeTokenWithLocalStorage() {
    if (typeof window === 'undefined') return;

    const _expired_time = localStorage.getItem(this.TOKEN_EXPIRED_KEY);
    this.expired_time = _expired_time;
    return this.expired_time;
  }

  getExpiredTimeTokenWithCookie() {
    if (typeof window === 'undefined') return;

    const _expired_time = Cookies.get(this.TOKEN_EXPIRED_KEY);
    this.expired_time = _expired_time;
    return this.expired_time;
  }

  getRefreshTokenWithLocalStorage() {
    if (typeof window === 'undefined') return;

    const refresh_token = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    this.refresh_token = refresh_token;
    return this.refresh_token;
  }

  getRefreshTokenWithCookie() {
    if (typeof window === 'undefined') return;

    const refresh_token = Cookies.get(this.REFRESH_TOKEN_KEY);
    this.refresh_token = refresh_token;
    return this.refresh_token;
  }

  getDefaultFirstChapterWithLocalStorage() {
    if (typeof window === 'undefined') return;

    const defaultFirstChapter = localStorage.getItem(this.DEFAULT_FIRST_CHAPTER);
    this.default_first_chapter = JSON.parse(defaultFirstChapter);
    return this.default_first_chapter;
  }

  setAuthenTokenWithLocalStorage(tokenData) {
    if (typeof window === 'undefined') return;

    const { id_token, refresh_token } = tokenData;
    localStorage.setItem(this.TOKEN_KEY, id_token.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh_token.token);
    localStorage.setItem(this.TOKEN_EXPIRED_KEY, id_token.expired_time);
  }

  setAuthenTokenWithCookie(tokenData) {
    if (typeof window === 'undefined') return;

    const { id_token } = tokenData;

    Cookies.set(this.TOKEN_KEY, id_token);
  }

  setDefaultFirstChapterWithLocalStorage(status) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.DEFAULT_FIRST_CHAPTER, status);
  }

  setUserProfileLocalStorage(userData) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.PROFILE_USER, JSON.stringify(userData));
  }

  removeAuthenTokenWithLocalStorage() {
    if (typeof window === 'undefined') return;

    this.token = '';
    this.expired_time = '';
    this.refresh_token = '';

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRED_KEY);
  }

  removeAuthenTokenWithCookie() {
    if (typeof window === 'undefined') return;

    this.token = '';
    this.expired_time = '';
    this.refresh_token = '';
    this.authorization = '';

    Cookies.remove(this.TOKEN_KEY);
    Cookies.remove(this.AUTHORIZATION);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
    Cookies.remove(this.TOKEN_EXPIRED_KEY);
  }

  removeAllLocalStorage() {
    if (typeof window === 'undefined') return;

    this.token = '';
    this.expired_time = '';
    this.refresh_token = '';
    this.default_first_chapter = false;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.PROFILE_USER);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRED_KEY);
    localStorage.removeItem(this.DEFAULT_FIRST_CHAPTER);
  }

  getRole() {
    return localStorage.getItem(this.ROLE);
  }

  setRole(roleUser) {
    return localStorage.setItem(this.ROLE, roleUser);
  }

  removeRole() {
    return localStorage.removeItem(this.ROLE);
  }

  // Cookie
  getCookie(cname) {
    if (typeof window === 'undefined') return;

    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  setCookie(cname, cvalue, timeTest) {
    const d = new Date();
    d.setTime(d.getTime() + timeTest * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/;`;
  }

  deleteCookie(cname) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Use for test exam detail, role is student
   */
  getCurrentExamDetail() {
    if (typeof window === 'undefined') return;

    return localStorage.getItem(this.CURRENT_EXAM_DETAIL);
  }

  setCurrentExamDetail(exam) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.CURRENT_EXAM_DETAIL, JSON.stringify(exam));
  }

  removeCurrentExamDetail() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CURRENT_EXAM_DETAIL);
  }
}

export default ClientCache;
