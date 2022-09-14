
import Vue from 'vue'

export interface SearchManager {
  searchKey: string;
}

export default class SearchManager extends Vue {
  
  searchKey: string;
  constructor(props: object) {
    super(props)
    this.searchKey = ''
  }

  setSearchKey(key: string) {
    this.searchKey = key
    this.$emit('startSearch')
  }

  finishProgress() {
    this.searchKey = ''
  }
}

let instance: SearchManager;
SearchManager.getSingleton = function() {
  if (!instance) {
    instance = new SearchManager()
    // window.searchSingleton = instance
    // window.searchSingleton.setSearchKey('')
  }
  return instance
}

export const searchSingleton = SearchManager.getSingleton()