<template>
  <div class="FormFieldDisplay">
    <div class="controls">
      <!-- <span>Variation: {{ variation }}</span>
      <select v-model="variation">
        <option>default</option>
        <option>warning</option>
        <option>error</option>
        <option>valid</option>
      </select>
      <br>
      <span>prependText: {{ prependText }}</span>
      <input v-model="prependText" placeholder="prepend">
      <br>
      <span>appendText: {{ appendText }}</span>
      <input v-model="appendText" placeholder="append">
      <br>
      <span>placeholder: {{ placeholder }}</span>
      <input v-model="placeholder" placeholder="placeholder">
      <br>
      <span>align: {{ align }}</span>
      <select v-model="align">
        <option>left</option>
        <option>center</option>
        <option>right</option>
      </select>
      <br>
      <span>typeOfInput: {{ typeOfInput }}</span>
      <select v-model="typeOfInput">
        <option>text</option>
        <option>tel</option>
        <option>email</option>
        <option>url</option>
        <option>search</option>
        <option>password</option>
      </select>
      <br>
      <span>disabled: {{ disabled }}</span>
      <input type="checkbox" v-model="disabled"> -->
    </div>

    <div class="tests">
      <div>
        <SbSearchableInput v-model="selectionBasic" :options="optionsBasic"></SbSearchableInput>
      </div>
      <br>
      <!-- <SbSearchableInput v-model="searchStringComplex" :options="optionsComplex" :keyValue="'id'">
        <SbSearchOption slot-scope="{ option, index }">{{ index }} {{ option.displayName | i18 }}</SbSearchOption>
      </SbSearchableInput> -->

      <SbField>
        <SbLabel>My Label</SbLabel>
        <SbSearchableInput v-model="selectionComplex" :options="optionsComplex" :keyValue="'id'">
          <SbSearchOption slot-scope="{ option, index }">{{ index }} {{ option.displayName | i18 }}</SbSearchOption>
        </SbSearchableInput>
        <SbFormHelperText>My helper text</SbFormHelperText>
      </SbField>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SbSearchableInput from '@/components/SearchableInput/SearchableInput.vue'
import SbSearchOption from '@/components/SearchableInput/SearchOption.vue'

import SbField from '@/components/FormField/SbField.vue'
import SbFormHelperText from '@/components/FormField/SbFormHelperText.vue'
import SbLabel from '@/components/FormField/SbLabel.vue'
import SbTextInput from '@/components/FormField/SbTextInput.vue'

export default {
  name: 'SearchableInputDisplay',
  components: {
    SbSearchableInput,
    SbSearchOption,
    SbField,
    SbFormHelperText,
    SbLabel,
    SbTextInput,
  },
  data: () => ({
    selectionBasic: null,
    selectionComplex: null,
    optionsBasic: ['first', 'second', 'third', 'fourth', 'fifth'],
    optionsComplex: [{id: 1, displayName: "first"}, {id: 2, displayName: "second"}, {id: 3, displayName: "third"}, {id: 4, displayName: "fourth"}, {id: 5, displayName: "fifth"}]

  }),
  methods: {
    
  },
  filters: {
    i18 (value) {
      return value.toUpperCase()
    }
  }
}
</script>


<style lang="scss">
.FormFieldDisplay {
  width: 100%;
  .controls {
    display: flex;
    justify-content: center;
    width: 50%;
    margin-bottom: 5em;
    flex-direction: column;
    margin: 0 auto 5em;
  }
  .tests {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
