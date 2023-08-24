import { createStore } from 'vuex'
import pageDesigner from './modules/pageDesigner'
// import dataStack from './plugin/plugin'


const store = createStore({
  modules: {
    pageDesigner
  }
  // plugins: [dataStack]
})

export default store
