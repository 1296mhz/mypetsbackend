<template>
  <v-container fluid>
    <v-card class="">
      <div id="editor" ref="editor"></div>
    </v-card>
  </v-container>
</template>

<script>
import * as monaco from 'monaco-editor';
/* eslint-disable */
export default {
  name: 'CodeEditor',

  data: () => ({
  editor: null,
  editorOptions: { 
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'text/javascript',
    minimap: { 
      enabled: false 
    },
    wordWrap: true,
    automaticLayout: true,
    }
  }),
  methods: {
    createEditor() {
      this.editor = monaco.editor.create(document.getElementById('editor'), this.editorOptions);
    },
    getEditorValue() {
      // Returns the current editor value
      return this.editor.getValue();
    },
  },
  mounted() {
    this.createEditor();
  },
};
</script>

<style>
#editor {
  height: 500px;
  width: 100%;
  overflow: hidden;
}
</style>
