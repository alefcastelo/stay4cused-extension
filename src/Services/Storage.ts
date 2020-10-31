import store from 'store2'

class Storage {
  static set (key: string, value: string, overwrite: boolean = false): void {
    store.set(key, value, overwrite)
  }

  static remove (key: string): void {
    store.remove(key)
  }

  static get (key: string, defaultValue: any, callbackValue?: Function): any {
    if (store.has(key)) {
      if (callbackValue instanceof Function) {
        return callbackValue(store.get(key))
      }

      return store.get(key)
    }

    return defaultValue
  }
}

export default Storage
