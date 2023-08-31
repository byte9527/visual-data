type commandHander = (x: unknown) => void

interface commandModel {
  name: string,
  handler: commandHander,
}

class Command {
  context: unknown
  commands: Array<string>
  commandMap: {
    [property: string]: commandHander
  }

  constructor() {
    console.log('命令中心：画布数据变动, 可进行设计会放')
    this.commands = []
    this.commandMap = {}
  }

  get commandNames(): Array<string> {
    return Object.keys(this.commandMap)
  }

  registerCommand(model: commandModel): void {
    const { name, handler } = model
    if (this.commands.includes(name)) {
      console.warn(`command名称重复: ${name}命令已被注册`)
    } else {
      this.commandMap[name] = handler
    }
  }

  call(name: string, ...args): void {
    if (this.commands.includes(name)) {
      console.warn(`command名称重复: ${name}命令未被注册`)
    } else {
      this.commandMap[name].call(this.context, args)
    }
  }
}
const commander = new Command();

export default commander;
