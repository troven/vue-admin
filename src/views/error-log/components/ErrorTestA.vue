<template>
  <div>
    <!--error code-->
    Error A: {{ name }}
    <!--error code-->
  </div>
</template>

<script>
export default {
  name: 'ErrorTestA',
  data: function() {
    return {
      name: 'Error'
    }
  }
}
</script>
