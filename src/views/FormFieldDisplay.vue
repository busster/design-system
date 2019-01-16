<template>
  <div class="FormFieldDisplay">
    <div class="controls">
      <span>Variation: {{ variation }}</span>
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
      <input type="checkbox" v-model="disabled">
      <button @click="reset">rest</button>
    </div>

    <div class="tests">
      <!-- <SbField :variation="variation" >
        <SbLabel>My Label</SbLabel>
        <SbTextInput
          @keyup="iamkeyup"
          @focus="iamfocus"
          @blur="iamblur"
          @change="iamchange"
          :prepend="prependText"
          :append="appendText"
          :placeholder="placeholder"
          :align="align"
          :type="typeOfInput"
          :disabled="disabled"
          v-model="textModel"
          :maxlength="10"
        ></SbTextInput>
        <SbFormHelperText>My helper text</SbFormHelperText>
      </SbField> -->

      <SbField :variation="variation" >
        <SbLabel>My Label</SbLabel>
        <SbTextInput
          @keyup="iamkeyup"
          @focus="iamfocus"
          @blur="iamblur"
          @change="iamchange"
          :prepend="prependText"
          :append="appendText"
          :placeholder="placeholder"
          :align="align"
          :type="typeOfInput"
          :disabled="disabled"
          v-model="textModel2"
        ></SbTextInput>
        <SbFormHelperText :counter="10">My helper text</SbFormHelperText>
      </SbField>
      <!-- <SbTextInput v-model="textModel3" :maxlength="5"></SbTextInput> -->
      <!-- <SbTextInput v-model="textModel4"></SbTextInput> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SbField from '@/components/FormField/SbField.vue'
import SbFormHelperText from '@/components/FormField/SbFormHelperText.vue'
import SbLabel from '@/components/FormField/SbLabel.vue'
import SbTextInput from '@/components/FormField/SbTextInput.vue'

export default {
  name: 'FormFieldDisplay',
  components: {
    SbField,
    SbFormHelperText,
    SbLabel,
    SbTextInput,
  },
  data: () => ({
    variation: 'default',
    prependText: '',
    appendText: '',
    placeholder: '',
    align: 'left',
    typeOfInput: 'text',
    disabled: false,
    textModel: 'init',
    textModel2: '',
    textModel3: '',
    textModel4: ''
  }),
  methods: {
    iamfocus (e) {
      // console.log('iamfocus: ', e)
    },
    iamblur (e) {
      // console.log('iamblur: ', e)
    },
    iamchange (e) {
      // console.log('iamchange: ', e)
    },
    iamkeyup (e) {
      // console.log('iamkeyup: ', e)
    },
    reset () {
      this.textModel2 = ''
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
