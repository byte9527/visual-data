import { createStore } from 'vuex'
import pageDesigner from './modules/pageDesigner'
import dialog from './modules/dialog'
// import dataStack from './plugin/plugin'


const store = createStore({
  modules: {
    pageDesigner,
    dialog
  },
  // plugins: [dataStack]
})

export default store
