export default function (ctx) {
  const sizeOptions = ctx.util.getConstant('sizeOptions');

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

      props: {
        type: 'primary'
      },
    },
    editOptions: {
      layout: {
        grid: {
          initSize: {
            w: 4,
            h: 4
          },
        },
        position: {
          initSize: {
            width: 480,
            height: 400
          },
        }
      }
    },
    lifeCircle: {
      add() {},
      remove() {},
    },
  };
}
