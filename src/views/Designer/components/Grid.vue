<template>
  <canvas class="canvas" ref="canvas" :height="height" :width="width"></canvas>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
  props: {
    layout: {
      type: Object,
      default() {
        return {
          paddingX: 16,
          paddingY: 16,
          colNum: 8,
          cellHeight: 32,
          xSpace: 8,
          ySpace: 8,
        };
      },
    },
    cellColor: {
      type: String,
      default: '#F2F5FB',
    },
    spaceColor: {
      type: String,
      default: '#f4f8ff',
    },
  },
  data() {
    return {
      height: 500,
      width: 500,
    };
  },
  watch: {
    layout: {
      handler() {
        this.repaint();
      },
      deep: true,
    },
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.resetSize();
    this.addListener();
    this.repaintAfterResize = debounce(this.resetSize, 100);
  },
  methods: {
    addListener() {
      this.observer = new ResizeObserver((entries) => {
        this.repaintAfterResize();
      });
      this.observer.observe(this.$el.parentElement);
    },
    resetSize() {
      const parentEl = this.$el.parentElement;
      this.width = parseInt(parentEl.clientWidth) - 10;
      this.height = parseInt(parentEl.clientHeight) - 10;

      this.$nextTick(() => {
        this.repaint();
      });
    },
    repaint() {

      let ctx = this.ctx;
      let x = 0,
        y = 0;
      let { ySpace, xSpace, colNum, paddingY, paddingX } = this.layout;
      const { width, height } = this;

      let cellWidth = (width - xSpace * (colNum - 1) - paddingX * 2) / colNum;
      let cellHeight = this.layout.cellHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = this.spaceColor;
      ctx.fillRect(x, y, width, height);

      //按照Salesforce Einstein 的方式将背景色易一定规律转换成每个小矩形的颜色
      const cellColor = this.getCellColor(this.spaceColor);
      ctx.fillStyle = cellColor;
      // ctx.fillRect(8, 8, 16, 16);
      // ctx.fillRect(8, 32, 16, 16);
      for (let i = 0; i < colNum; i++) {
        for (let j = 0; j * (ySpace + cellHeight) < height; j++) {
          x = i * (xSpace + cellWidth) + paddingX;
          y = j * (ySpace + cellHeight) + paddingY;
          // canvas绘图时会从坐标中间往两边发散，而不是以目标点为起点绘制
          // 因此为保证与dom图渲染一致，使组件卡片能正常匹配背景，需要做一些偏移和宽高的减少
          ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
        }
      }
    },
    /**
     * 将8位的16进制hex颜色值转换成rgb颜色字符串
     */
    hex8ToRgb(hex8Color) {
      let hexColor = hex8Color;
      if (hexColor.indexOf('rgba') > -1) {
        return hexColor.replace('a', '').replace(/,[\d\.]+\)$/g, ')');
      } else if (hexColor.indexOf('rgb') > -1) {
        return hexColor;
      }
      let RGB =
        'rgb(' +
        parseInt('0x' + hexColor.slice(1, 3)) +
        ',' +
        parseInt('0x' + hexColor.slice(3, 5)) +
        ',' +
        parseInt('0x' + hexColor.slice(5, 7)) +
        ')';
      return RGB;
    },
    /**
     * 函数体代码来自于Salesforce Einstein的【仪表盘】功能的源码
     * 函数功能：
     *    将网格的背景色按照一定的规律转换成【小矩形】的背景色
     */
    getCellColor(cellColor) {
      let RGB = this.hex8ToRgb(cellColor);
      let reg =
        /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*\)$/i;
      let t = RGB.match(reg);
      if (!t) {
        throw new Error(
          'Invalid color code: '.concat(cellColor, ' is not in RGB format'),
        );
      }
      const r = t.slice(1).map((e) => Number(e) / 255),
        [n, i, s] = r,
        o = Math.min(...r),
        u = Math.max(...r),
        l = (100 * (o + u)) / 2,
        c =
          100 *
          (function (e, t, r) {
            return e === t
              ? 0
              : r < 50
              ? (t - e) / (t + e)
              : (t - e) / (2 - t - e);
          })(o, u, l),
        d =
          60 *
          (function (e, t, r, n, i) {
            return t === e
              ? 0
              : t === r
              ? (n - i) / (t - e)
              : t === n
              ? 2 + (i - r) / (t - e)
              : 4 + (r - n) / (t - e);
          })(o, u, n, i, s);
      let [N, I, A] = [Math.round(d), Math.round(c), Math.round(l)];
      return (
        A < 20 ? (A += 8) : A < 60 ? (A += 5) : (A -= 5),
        'hsl('.concat(N, ', ').concat(I, '%, ').concat(A, '%)')
      );
    },
  },
};
</script>
