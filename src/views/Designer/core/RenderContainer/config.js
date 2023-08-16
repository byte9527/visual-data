export default {
  props: {
    layout: {
      name: "布局",
      type: "group",
      children: {
        type: {
          name: "布局方式",
          type: "select",
          props: {
            options: [
              { label: "固定", value: "absolute" },
              { label: "栅格", value: "grid" },
              { label: "弹性", value: "flex" },
              { label: "流体", value: "fluid" },
            ],
          },
        },
        deirection: {
          name: "方向",
          type: "select",
          props: {
            options: [
              { label: "横向", value: "row" }，
              { label: "横向", value: "column" }
            ],
          },
        },
      },
    },
  },
};
