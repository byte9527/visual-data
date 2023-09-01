export default function (ctx) {
  const sizeOptions = ctx.util.getConstants('sizeOptions');

  return {
    config: {
      styleConfig: {},
      propsConfig: {
        size: {
          type: 'radio',
          name: '尺寸',
          props: {
            options: sizeOptions,
          },
        },
        type: {
          type: 'radio',
          name: '尺寸',
          props: {
            options: sizeOptions,
          },
        },
      },
    },
    defaultValue: {
      style: {},

      props: {},
    },
    configInEditor: {
      layout: {
        grid: {
          w: 4,
          height: 4
        }
      }
    },
    lifeCircle: {
      add() {},
      remove() {},
    },
  };
}
