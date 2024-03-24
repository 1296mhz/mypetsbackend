<template>
   <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export default {
  name: 'HomeView',

  components: {
    Codemirror,
  },
  data: () => ({
    extensions: [javascript(), oneDark],
  }),
};
</script>
