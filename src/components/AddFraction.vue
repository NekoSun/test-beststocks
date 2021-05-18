<template>
  <button class="btn" @click="$emit('click')">
      add new elenent
  </button>
</template>

<style scoped lang="scss">
.btn {
    width: 150px;
    padding: 11px;
    margin-top: 20px;
}
</style>