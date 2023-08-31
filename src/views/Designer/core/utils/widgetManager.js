class WidgetManager {
  constructor () {
    this.map = {}
    this.init()
  }

  init () {
    const modules = import.meta.glob('../../widgets/\*/index.js', { eager: true })
    for (const k in modules) {
      const m = modules[k]
      this.registerWidget(m.type, m.default)
    }
  }

  getWidgetMetadata (type) {
    return this.map[type]
  }
  
  getWidgetConfig (type) {
    return this.map[type].config
  }

  getWidgetDefine (type) {
    return this.map[type].config
  }

  registerWidget (type, config) {
    this.map[config.type] = config
  }

  createInstance(type) {
    
  }
}

const widgetManger = new WidgetManager()

export default widgetManger

