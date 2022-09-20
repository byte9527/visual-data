import mitt, { Emitter } from 'mitt'

let instance: SearchManager;

interface searchManagerProps {
  key?: string;
}

type Events = {
  [propName: string]: any
}
export class SearchManager {
  searchKey: string;
  emitter: Emitter<Events>;
  constructor(props: searchManagerProps) {
    this.searchKey = props.key || ''
    this.emitter = mitt()
  }

  static getSingleton = function () {
    if (!instance) {
      instance = new SearchManager({})
    }
    return instance
  }

  setSearchKey(key: string) {
    this.searchKey = key
    this.$emit('startSearch', key)
  }

  $on(...args: [string, any]) {
    this.emitter.on(...args)
  }
  $off(...args: [string, any]) {
    this.emitter.off(...args)
  }
  $emit(...args: [string, any]) {
    this.emitter.emit(...args)
  }


  finishProgress() {
    this.searchKey = ''
  }
}

export const searchSingleton = SearchManager.getSingleton()