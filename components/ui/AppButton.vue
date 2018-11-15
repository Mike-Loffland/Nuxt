<template>
<!-- App naming convention": https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended -->
  <button
    class="button"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners">
      <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>


<style scoped>
.button {
  font: inherit;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid black;
}

.button:hover,
.button:active {
  background-color: rgb(51, 51, 51);
  border: 1px solid black;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}

.delete {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.delete:hover,
.delete:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}

.cancel {
  background-color: gray;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: rgb(78, 78, 78);
  border: 1px solid transparent;
  color: white;
}
</style>
