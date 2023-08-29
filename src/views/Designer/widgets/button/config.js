export default function (ctx) {

  const sizeOptions = ctx.util.getConstants('sizeOptions');
  
  return {
    styleConfig: {

    },
    style: {
    
    },
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
    props: {},
  };
}
