export enum LocalStorageKeys {
    OPTIONAL_KEY = "selectedOptional",
    DOMAIN_KEY = "selectedOption"
}

export const findInLocalStorage = (key: string, defaultVal: string) => {
    const value = localStorage.getItem(key);
    if (value != null && value != "") {
        return value;
    }
    else {
        localStorage.setItem(key, defaultVal);
        return defaultVal;
    }
}

export const setInLocalStorage = (key: string, val: string) => {
    localStorage.setItem(key, val);
  }