<template>
  <div class="app-container documentation-container">
    <a
      v-for="(page, i) in topics"
      :key="i"
      class="btn btn-primary"
      target="_blank"
      :href="page.href"
    >{{ page.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
  props: {
    topics: {
      required: false,
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
