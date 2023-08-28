export function defaultPageSetting() {
  return {
    style: {},
    layout: {
      type: 'grid',
      gridSetting: {
        showInEdit: true,
        paddingX: 16,
        paddingY: 16,
        colNum: 12,
        cellHeight: 32,
        xSpace: 8,
        ySpace: 0,
      },
      flexSetting: {
        flexDirection: 'row',
      },
    },
  };
}
