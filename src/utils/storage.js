import config from "@config/config";

export default {
    setItem(key, val) {
        const storage = this.getStorage();
        storage[key] = val;
        this.setStorage(storage);
    },
    getItem(key) {
        return this.getStorage()[key];
    },
    clearItem(key) {
        const storage = this.getStorage();
        delete storage[key];
        this.setStorage(storage);
    },
    claerAll() {
        localStorage.claerAll();
    },
    setStorage(val) {
        window.localStorage.setItem(config.nameSpace, JSON.stringify(val))
    },
    getStorage() {
        const storage = window.localStorage.getItem(config.nameSpace);
        return storage ? JSON.parse(storage) : {};
    }
}