class WidgetManager {
  constructor(props) {
    this.map = {}
    this.init()
  }

  init() {
    const modules = import.meta.glob("../widget/\*/index.js")
    debugger
  }

  getWidgetConfig(type) {

  }

  getWidgetDefine(type) {
  
  }

  registerWidget() {
    
  }
}

const widgetManger = new WidgetManager()

export default widgetManger

