declare namespace cForm {
  interface AnyKeyObject {
    [propName: string]: any;
  }

  interface controlOption {
    test: Array<string>;
    define: any;
    key: string;
    type: string
  }

  type componentDictType = {
    [propName: string]: Array<string>;
  }

  interface searchManagerProps {
    key?: string;
  }

  type Events = {
    [propName: string]: any
  }

  interface FormContext {
    form: object
  }

  interface FormSetting {
    util: object;
    controls: object;
  }

  interface ControlNode {
    type: string;
    props?: AnyKeyObject;
    name?: string;
    children: {
      [propName: string]: ControlNode;
    };
  }
}