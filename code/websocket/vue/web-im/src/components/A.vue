<template>
  <div>
    <p @click="clickAComponent()">{{value.name}}</p>
  </div>
</template>

<script>
export default {
  name: "A",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  methods: {
    clickAComponent() {
      console.log('A====click')
      this.$emit('clickA')
    }
  }
}
</script>
