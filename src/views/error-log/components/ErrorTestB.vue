<template>
  <div>
    <!--error code-->
    Error B: {{ name }}
    <!--error code-->
  </div>
</template>

<script>
export default {
  name: 'ErrorTestB',
  data: function() {
    return {
      name: 'Error'
    }
  }
}
</script>
