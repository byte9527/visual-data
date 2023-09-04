interface gridContainerOption {
  paddingX: number;
  paddingY: number;
  colNum: number;
  cellHeight: number;
  xSpace: number;
  ySpace: number;
  width: number;
  height: number;
}

type gridItemLayoutOption = {
  x: number;
  y: number;
  w: number;
  h: number;
  moved?: boolean;
};

type positionContainerOption = {
  width: number;
  height: number;
};

type parentLayout = {
  type: string;
  setting: gridContainerOption | positionContainerOption;
};

const directionConfig = {
  tl: {
    moveX(c) {
      return c.moveX;
    },
    moveY(c) {
      return c.moveY;
    },
    resizeWidth(c) {
      return -c.moveX;
    },
    resizeHeight(c) {
      return -c.moveY;
    },
  },
  tm: {
    moveY(c) {
      return c.moveY;
    },
    resizeHeight(c) {
      return -c.moveY;
    },
  },
  tr: {
    moveY(c) {
      return c.moveY;
    },
    resizeWidth(c) {
      return c.moveX;
    },
    resizeHeight(c) {
      return -c.moveY;
    },
  },
  ml: {
    moveX(c) {
      return c.moveX;
    },
    resizeWidth(c) {
      return -c.moveX;
    },
  },
  mr: {
    resizeWidth(c) {
      return c.moveX;
    },
  },
  bl: {
    moveX(c) {
      return c.moveX;
    },
    resizeWidth(c) {
      return -c.moveX;
    },
    resizeHeight(c) {
      return c.moveY;
    },
  },
  bm: {
    resizeHeight(c) {
      return c.moveY;
    },
  },
  br: {
    resizeWidth(c) {
      return c.moveX;
    },
    resizeHeight(c) {
      return c.moveY;
    },
  },
};

/* 操作行为 */
export const operateTypeEnum = {
  mark: 'mark',
  drag: 'drag', // 移动
  resize: 'resize', // 调整尺寸
  clickCanvas: 'clickCanvas', // 点击画布
};

/**
 * @description: 处理组件相关布局
 * @return {*}
 */
export class GridItemLayout {
  constructor(props) {
    this.props = props;
  }

  /**
   * @description: 获取相对画布的像素位置信息
   * @return {*}
   */
  static getBoundingContainerRect(param) {
    const { widgetLayout = {}, containerLayout = {} } = param;
    const { x, y, w, h } = widgetLayout;
    const cellWidth = GridContainerLayout.getCellWidth(containerLayout);
    const {
      xSpace,
      ySpace,
      cellHeight,
      paddingX = 8,
      paddingY = 8,
    } = containerLayout.detail;
    return {
      left: (cellWidth + xSpace) * x + paddingX,
      top: (cellHeight + ySpace) * y + paddingY,
      width: (cellWidth + xSpace) * w - xSpace,
      height: (cellHeight + ySpace) * h - ySpace,
    };
  }

  /**
   * @description: 获取鼠标移动时，位置的移动以及尺寸改变的数据
   * @param {*} direction
   * @param {*} movePosition
   * @return {*}
   */
  static getChangeDataByResize(direction, movePosition) {
    const config = directionConfig[direction];
    const data = {};

    Object.keys(config).forEach((k) => {
      const func = config[k];
      data[k] = func(movePosition);
    });

    return data;
  }

  /**
   * @description: 获取鼠标对组件进行拖拽或者resize时的投射区域的位置、尺寸信息
   * @param {*} param
   * @return {*}
   */

  static getCastRectByMouseMove(param) {
    const {
      containerLayout,
      validateMoveData = {},
      operateDetail = {},
      widgetLayout = {},
    } = param;
    const boundRect = this.getBoundingContainerRect(param);
    const cellWidth = GridContainerLayout.getCellWidth(containerLayout);
    const { xSpace, cellHeight, ySpace } = containerLayout.detail;
    const { moveX = 0, moveY = 0 } = validateMoveData;
    const { type = operateTypeEnum.drag, resizeDirection: direction } =
      operateDetail;
    let [moveTop, moveLeft, resizeWidth, resizeHeight] = [0, 0, 0, 0];
    let [moveCol, moveRow, resizeCol, resizeRow] = [0, 0, 0, 0];
    const { x, y, w, h } = widgetLayout;
    const minWidth = 1;
    const minHeight = 1;
    const containerColCount = containerLayout.detail.colNum;
    if (type === operateTypeEnum.drag) {
      moveCol = parseInt(
        (Math.abs(moveX) + (cellWidth + xSpace) / 2) / (cellWidth + xSpace),
      );
      moveRow = parseInt(
        (Math.abs(moveY) + (cellHeight + ySpace) / 2) / (cellHeight + ySpace),
      );
      // 确定移动位置方向
      moveX < 0 && (moveCol = -moveCol);
      moveY < 0 && (moveRow = -moveRow);

      // 处理容器边界
      moveCol + x < 0 && (moveCol = -x);
      moveRow + y < 0 && (moveRow = -y);
      moveCol + w + x > containerColCount &&
        (moveCol = containerColCount - w - x);

      moveLeft = moveCol * (cellWidth + xSpace);
      moveTop = moveRow * (cellHeight + ySpace);
    } else if (type.includes('resize')) {
      const config = directionConfig[direction];
      const [verticalMark, horizentalMark] = direction;
      // 需要先进行widht/height的计算（因为有minWidth，minHeight或者其他边界的限制）
      if (config.resizeWidth) {
        resizeCol = parseInt(
          (Math.abs(moveX) + (cellWidth + xSpace) / 2) / (cellWidth + xSpace),
        );
        if (
          (horizentalMark === 'r' && moveX < 0) ||
          (horizentalMark === 'l' && moveX > 0)
        ) {
          resizeCol = -resizeCol;
        }
        // 最小宽度矫正
        if (resizeCol + w < minWidth) {
          resizeCol = minWidth - w;
        }
      }
      if (config.resizeHeight) {
        resizeRow = parseInt(
          (Math.abs(moveY) + (cellHeight + ySpace) / 2) / (cellHeight + ySpace),
        );
        if (
          (verticalMark === 'b' && moveY < 0) ||
          (verticalMark === 't' && moveY > 0)
        ) {
          resizeRow = -resizeRow;
          // 最小高度矫正
          if (resizeRow + h < minHeight) {
            resizeRow = minHeight - h;
          }
        }
      }
      if (config.moveX) {
        if (horizentalMark === 'l') {
          moveCol = -resizeCol;
        }
        if (resizeCol + w === minWidth) {
          moveCol = -resizeCol;
        }
      }
      // 左边界
      if (moveCol + x < 0) {
        moveCol = -x;
        resizeCol = x;
      }

      // 右边界
      if (resizeCol + x + w + moveCol > containerColCount) {
        resizeCol = containerColCount - x - w;
      }

      if (config.moveY) {
        moveRow = parseInt(
          (Math.abs(moveY) + (cellHeight + ySpace) / 2) / (cellHeight + ySpace),
        );
        moveY < 0 && (moveRow = -moveRow);
        if (resizeRow + h === minHeight) {
          moveRow = -resizeRow;
        }
      }
      // 上边界
      if (moveRow + y < 0) {
        moveRow = -y;
        resizeRow = y;
      }

      resizeWidth = resizeCol * (cellWidth + xSpace);
      resizeHeight = resizeRow * (cellHeight + ySpace);
      moveLeft = moveCol * (cellWidth + xSpace);
      moveTop = moveRow * (cellHeight + ySpace);
    }
    return {
      top: boundRect.top + moveTop,
      left: boundRect.left + moveLeft,
      width: boundRect.width + resizeWidth,
      height: boundRect.height + resizeHeight,
      x: x + moveCol,
      y: y + moveRow,
      w: w + resizeCol,
      h: h + resizeRow,
    };
  }

  static getWidgetRect(param) {
    const {
      containerLayout,
      widgetLayout,
      changeData,
      targetId,
      containerId,
      originContainerId,
      rootContainerId = 'canvas',
    } = param;

    const rootContainer = document.querySelector(
      `[data-container-id=${rootContainerId}]`,
    );

    const containerMove = { x: 0, y: 0 };
    const el = document.querySelector(
      `[data-container-id=${originContainerId}]`,
    );
    const rootContainerRect = rootContainer.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    containerMove.x = elRect.x - rootContainerRect.x;
    containerMove.y = elRect.y - rootContainerRect.y;

    const rect = this.getBoundingContainerRect({
      widgetLayout,
      containerLayout,
    });
    const data = changeData;
    const { moveX = 0, moveY = 0, resizeWidth = 0, resizeHeight = 0 } = data;

    return {
      id: targetId,
      left: rect.left + moveX + containerMove.x,
      top: rect.top + moveY + containerMove.y,
      width: rect.width + resizeWidth,
      height: rect.height + resizeHeight,
    };
  }

  /**
   * @description: 通过组件位置获取投射的布局信息
   * @param {*} param
   * @return {*}
   */

  static getCastLayoutByWidgetRect(param) {
    const { widgetRect, containerLayout } = param;
    const result = {};

    return result;
  }

  static _stepMove(targetLayout, childrenLayout, direction) {
    let isCollsion = false;

    while (targetLayout[direction] > 0 && !isCollsion) {
      targetLayout[direction]--;
      if (
        GridContainerLayout.getAllCollisions(childrenLayout, targetLayout)
          .length
      ) {
        isCollsion = true;
      }
    }
    if (isCollsion) {
      targetLayout[direction]++;
    }

    return targetLayout;
  }

  /**
   * @description: 从右下角获取新的组件的位置, 强调插入的顺序，同时也能填补空缺
    步骤：1、得出所有组件构成的大矩形, 大矩形宽度为容器宽度
          2、以矩形的右下角为起点，对齐新增组件的右下角，如果新组建超出顶部区域，测将y置为0
            2-1、如果和其他组件有碰撞，则在大矩形范围之外加入新组件
            2-2、如果和其他组件没有碰撞，则将组件先向上平移，每次平移钱进行碰撞检测，如果有碰撞，停止向上平移，
                 再向左平移，同样平移前进行碰撞检测，如果有碰撞，则停止平移,在此进行向上移动
   * @param {*} param
   * @return {*}
   */
  static getNewItemPositionFromRightBottom(param) {
    const { containerLayout, childrenLayout = [], widgetLayout } = param;
    const newItemLayout = {
      w: widgetLayout.w,
      h: widgetLayout.h,
      x: 0,
      y: 0,
    };
    if (childrenLayout.length === 0) {
      return newItemLayout;
    }

    const boxRect = {
      x: 0,
      y: 0,
      w: containerLayout.detail.colNum,
      h: GridContainerLayout.getChildBottomSize(childrenLayout),
    };

    newItemLayout.x = boxRect.w - widgetLayout.w;
    newItemLayout.y = boxRect.h - widgetLayout.h;
    if (newItemLayout.y < 0) {
      newItemLayout.y = 0;
    }

    if (
      GridContainerLayout.getAllCollisions(childrenLayout, newItemLayout).length
    ) {
      newItemLayout.y = boxRect.h;
      newItemLayout.x = 0;

      // 尝试向上平移
      this._stepMove(newItemLayout, childrenLayout, 'y');
    } else {
      this._stepMove(newItemLayout, childrenLayout, 'y');
      this._stepMove(newItemLayout, childrenLayout, 'x');
      this._stepMove(newItemLayout, childrenLayout, 'y');
    }

    return newItemLayout;
  }

  /**
   * @description: 从左上角获取新组件的位置，即见缝插针式的填补
   * @param {*} param
   * @return {*}
   */

  static getNewItemPositionFromTopLeft(param) {
    const position = { x: 0, y: 0 };
    return {};
  }
}

/**
 * @description: 处理画布布局
 * @return {*}
 */
export class GridContainerLayout {
  cellheight: number;
  props: gridContainerOption;

  constructor(props: gridContainerOption) {
    this.props = props;
    this.init();
  }

  init() { }

  update(newProps) {
    Object.assign(this.props, newProps);
  }

  get cellWidth() {
    const { width, xSpace, colNum, paddingX = 8 } = this.props;
    return (width - xSpace * (colNum - 1) - paddingX * 2) / colNum;
  }

  get value() {
    const { width, height, xSpace, ySpace, paddingX } = this.props;
    return {
      width,
      height,
      cellWidth: this.cellWidth,
      cellHeight: this.cellHeight,
      xSpace,
      ySpace,
      paddingX,
    };
  }

  static getCellWidth(param) {
    const layout = new GridContainerLayout(param);
    return layout.cellWidth;
  }

  static sortLayoutItemsByRowCol(layout) {
    return [].concat(layout).sort(function (a, b) {
      if (a.y === b.y && a.x === b.x) {
        return 0;
      }

      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        return 1;
      }

      return -1;
    });
  }

  /**
   * @description: 移动元素
   * @param {*} layout 容器下的元素布局
   * @param {*} l 被移动元素
   * @param {*} x 移动元素的x值
   * @param {*} y 移动元素的y值
   * @param {*} isUserAction 是否是用户操作
   * @param {*} preventCollision 阻止碰撞
   * @return {*}
   */

  static moveElement(
    layout: Array<gridItemLayoutOption>,
    l: gridItemLayoutOption,
    x: number,
    y: number,
    isUserAction = false,
    preventCollision = false,
  ) {
    // if (l.y === y && l.x === x) return layout;

    const oldX = l.x;
    const oldY = l.y;
    const movingUp = y && l.y > y; // This is quite a bit faster than extending the object

    if (typeof x === 'number') l.x = x;
    if (typeof y === 'number') l.y = y;
    l.moved = true; // If this collides with anything, move it.
    // When doing this comparison, we have to sort the items we compare with
    // to ensure, in the case of multiple collisions, that we're getting the
    // nearest collision.

    let sorted = this.sortLayoutItemsByRowCol(layout);
    if (movingUp) sorted = sorted.reverse();
    const collisions = this.getAllCollisions(sorted, l);

    if (preventCollision && collisions.length) {
      l.x = oldX;
      l.y = oldY;
      l.moved = false;
      return layout;
    } // Move each item that collides away from this element.

    for (let i = 0, len = collisions.length; i < len; i++) {
      const collision = collisions[i]; // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);
      // Short circuit so we can't infinite loop

      if (collision.moved) continue; // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.

      // if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue; // Don't move static items - we have to move *this* element away

      if (l.y > collision.y) {
        continue;
      }

      if (collision.static) {
        layout = this.moveElementAwayFromCollision(
          layout,
          collision,
          l,
          isUserAction,
        );
      } else {
        layout = this.moveElementAwayFromCollision(
          layout,
          l,
          collision,
          isUserAction,
        );
      }
    }

    return layout;
  }

  static getFirstCollision(layout, layoutItem) {
    for (let i = 0, len = layout.length; i < len; i++) {
      if (this.collides(layout[i], layoutItem)) return layout[i];
    }
  }

  static moveElementAwayFromCollision(
    layout,
    collidesWith,
    itemToMove,
    isUserAction,
  ) {
    const preventCollision = false; // we're already colliding
    // If there is enough space above the collision to put this element, move it there.
    // We only do this on the main collision as this can get funky in cascades and cause
    // unwanted swapping behavior.

    if (isUserAction) {
      // Make a mock item so we don't modify the item here, only modify in moveElement.
      const fakeItem = {
        x: itemToMove.x,
        y: itemToMove.y,
        w: itemToMove.w,
        h: itemToMove.h,
        i: '-1',
      };
      fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);

      if (!this.getFirstCollision(layout, fakeItem)) {
        return this.moveElement(
          layout,
          itemToMove,
          undefined,
          fakeItem.y,
          preventCollision,
        );
      }
    } // Previously this was optimized to move below the collision directly, but this can cause problems
    // with cascading moves, as an item may actually leapflog a collision and cause a reversal in order.

    return this.moveElement(
      layout,
      itemToMove,
      undefined,
      itemToMove.y + 1,
      preventCollision,
    );
  }

  /**
   * @description: 获取所有的碰撞元素
   * @param {*} layout 容器下的子项
   * @param {*} layoutItem 移动项
   * @return {*}
   */

  static getAllCollisions(layout, layoutItem) {
    return layout.filter((l) => {
      return this.collides(l, layoutItem);
    });
  }

  /**
   * @description: 检测是否碰撞
   * @param {*} l1
   * @param {*} l2
   * @return {*}
   */

  static collides(l1, l2) {
    if (l1 === l2) return false; // same element

    if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2

    if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2

    if (l1.y + l1.h <= l2.y) return false; // l1 is above l2

    if (l1.y >= l2.y + l2.h) return false; // l1 is below l2

    return true; // boxes overlap
  }

  static compact(layout, verticalCompact, minPositions) {
    // Statics go in the compareWith array right away so items flow around them.
    const compareWith = this.getStatics(layout); // We go through the items by row and column.

    const sorted = this.sortLayoutItemsByRowCol(layout); // Holding for new items.

    const out = Array(layout.length);

    for (let i = 0, len = sorted.length; i < len; i++) {
      let l = sorted[i]; // Don't move static elements

      if (!l.static) {
        l = this.compactItem(compareWith, l, verticalCompact, minPositions); // Add to comparison array. We only collide with items before this one.
        // Statics are already in this array.

        compareWith.push(l);
      } // Add to output array to make sure they still come out in the right order.

      out[layout.indexOf(l)] = l; // Clear moved flag, if it exists.

      l.moved = false;
    }

    return out;
  }

  static getStatics(layout) {
    // return [];
    return layout.filter(function (l) {
      return l.static;
    });
  }

  static compactItem(compareWith, l, verticalCompact, minPositions) {
    if (verticalCompact) {
      // Move the element up as far as it can go without colliding.
      while (l.y > 0 && !this.getFirstCollision(compareWith, l)) {
        l.y--;
      }
    } else if (minPositions) {
      const minY = minPositions[l.i].y;

      while (l.y > minY && !this.getFirstCollision(compareWith, l)) {
        l.y--;
      }
    } // Move it down, and keep moving it down if it's colliding.

    let collides = this.getFirstCollision(compareWith, l);

    while (collides) {
      l.y = collides.y + collides.h;
      collides = this.getFirstCollision(compareWith, l);
    }

    return l;
  }

  static getChildBottomSize(children) {
    let height = 0;
    children.forEach((item) => {
      const h = item.y + item.h;
      if (h > height) {
        height = h;
      }
    });
    return height;
  }
}

export class Layout {
  static getInitStyle(
    type: string,
    parentLayout: parentLayout,
    options: unknown,
  ) { }
}
