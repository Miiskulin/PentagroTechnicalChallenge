<template>
  <div v-if="visible" :class="['alert', color]">
    {{ text }}
  </div>
</template>
  
<script>
import '../styles/defaultStyles.css'

export default {
  name: 'MessageComponent',

  data() {
    return {
      visible: false,
      text: '',
      color: ''
    }
  },
  methods: {
    showAlert(text, color) {
      this.text = text
      this.color = color
      this.visible = true

      setTimeout(() => {
        this.visible = false
      }, 3000)
  }
}
}

</script>
  
<style>
  .alert {
    font-size: 17px;
    padding: 10px;
    border-radius: 5px;
    color: var(--font-light-color);
    transition: opacity 0.3s ease-in-out;
  }

  .success {
    background-color: #008148;
  }

  .error {
    background-color: #ef2917;
  }
</style>