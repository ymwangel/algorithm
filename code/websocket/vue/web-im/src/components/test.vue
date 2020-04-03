<template>
  <div>
    <div v-for="item in arr">
      <slot :row="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    arr: {
      type: Array,
      default: []
    }
  }
}
</script>
