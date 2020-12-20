<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <g>
      <line
        stroke="#adcfe0"
        stroke-width="4"
        stroke-linecap="round"
        :x1="x0 + r * Math.cos(hourAngel)"
        :y1="y0 + r * Math.sin(hourAngel)"
        :x2="x0 + hourLength * Math.cos(hourAngel)"
        :y2="y0 + hourLength * Math.sin(hourAngel)"
      />
      <line
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        :x1="x0 + r * Math.cos(minusAngel)"
        :y1="y0 + r * Math.sin(minusAngel)"
        :x2="x0 + minusLength * Math.cos(minusAngel)"
        :y2="y0 + minusLength * Math.sin(minusAngel)"
      />
      <circle
        :cx="x0"
        :cy="y0"
        :r="r"
        fill="currentColor"
        stroke="#fff"
        stroke-width="5"
      />
      <polygon :points="sanjiao" fill="#fff" />
    </g>
    <g>
      <line
        stroke-width="2"
        stroke-linecap="round"
        v-for="(v, i) in getKedu"
        :key="i"
        :stroke="v.color"
        :x1="v.x1"
        :y1="v.y1"
        :x2="v.x2"
        :y2="v.y2"
      />
    </g>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      r: 8,
      width: 300,
      height: 300,
      hourAngel: 0,
      minusAngel: 0,
      secendAngel: 0,
      hourLength: 80,
      minusLength: 95,
      secendLength: 120,
      animation: null
    }
  },
  computed: {
    x0() {
      return this.width / 2
    },
    y0() {
      return this.height / 2
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    sanjiao() {
      const offsetLength = 10
      const offsetAngel = Math.PI / 40
      const x1 = this.x0 + this.secendLength * Math.cos(this.secendAngel),
        y1 = this.y0 + this.secendLength * Math.sin(this.secendAngel)
      const x2 =
          this.x0 +
          (this.minusLength + offsetLength) *
            Math.cos(this.secendAngel + offsetAngel),
        y2 =
          this.y0 +
          (this.minusLength + offsetLength) *
            Math.sin(this.secendAngel + offsetAngel)
      const x3 =
          this.x0 +
          (this.minusLength + offsetLength) *
            Math.cos(this.secendAngel - offsetAngel),
        y3 =
          this.y0 +
          (this.minusLength + offsetLength) *
            Math.sin(this.secendAngel - offsetAngel)
      return `${x1},${y1} ${x2},${y2} ${x3},${y3}`
    },
    getKedu() {
      const colors = ["#ffffff", "#fcfdfe", "#f8fbfd", "#f5f9fb", "#f2f7fa", "#eff5f9", "#ebf3f8", "#e8f2f6", "#e5f0f5", "#e1eef4", "#deecf3", "#dbeaf1", "#d8e8f0", "#d4e6ef", "#d1e4ee", "#cee2ec", "#cbe0eb", "#c7deea", "#c4dce9", "#c1dbe7", "#bdd9e6", "#bad7e5", "#b7d5e4", "#b4d3e2", "#b0d1e1", "#adcfe0"]
      const PI = Math.PI
      const count = 180
      const perRadius = 2 * PI / count
      const length = 130
      const offsetLength = length + 10
      const res = []
      for (let i = 0; i < count; i++) {
        const curRadius = - PI / 2 + i * perRadius
        const offsetCount = Math.floor((this.secendAngel - curRadius) / perRadius)
        const points = {
          x1: this.x0 + length * Math.cos(curRadius),
          y1: this.y0 + length * Math.sin(curRadius),
          x2: this.x0 + offsetLength * Math.cos(curRadius),
          y2: this.y0 + offsetLength * Math.sin(curRadius),
          color: offsetCount >= 0 && offsetCount < colors.length ? colors[offsetCount] : '#adcfe0'
        }
        res.push(points)
      }
      return res
    }
  },
  methods: {
    getTime() {
      const PI = Math.PI
      const time = new Date()
      const hour = time.getHours()
      const minus = time.getMinutes()
      const secend = time.getSeconds()
      const milisSecend = time.getMilliseconds()

      const hourAngel =
        -PI / 2 + ((hour % 12) * 2 * PI) / 12 + 2 * (PI / 12) * (minus / 60)
      const minusAngel =
        -PI / 2 + (minus * 2 * PI) / 60 + ((2 * PI) / 60) * (secend / 60)
      const secendAngel =
        -PI / 2 + (secend * 2 * PI) / 60 + 2 * (PI / 60) * (milisSecend / 1000)
      this.hourAngel = hourAngel
      this.minusAngel = minusAngel
      this.secendAngel = secendAngel
    }
  },
  mounted() {
    this.getTime()

    const animation = () => {
      this.getTime()
      this.animation = requestAnimationFrame(animation)
    }
    this.animation = requestAnimationFrame(animation)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animation)
  }
}
</script>

<style scoped>
svg {
  width: 300px;
  height: 300px;
}
</style>
