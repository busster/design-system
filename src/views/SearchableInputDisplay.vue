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

      <!-- <div>
        <SbSearchableInput v-model="selectionBasicA" :options="optionsBasic">
          <SbSelectedSearchOption slot="selection" slot-scope="{ selection }" :value="selection | i18"></SbSelectedSearchOption>
        </SbSearchableInput>
      </div>

      <div class="spacer"></div>
      
      <div>
        <SbSearchableInput v-model="selectionBasicB" :options="optionsBasic"></SbSearchableInput>
      </div>

      <div class="spacer"></div>

      <div>
        <SbSearchableInput v-model="selectionBasicC" :options="optionsBasic"></SbSearchableInput>
      </div>

      <div class="spacer"></div> -->

      <!-- <SbField>
        <SbLabel>My Label</SbLabel>
        <SbSearchableInput
          v-model="selectionComplex"
          :options="optionsComplex"
          :keyValue="'id'"
          @search="handleSearchComplex"
        >
          <SbSelectedSearchOption slot="selection" slot-scope="{ selection }" :value="selection && selection.displayName | i18"></SbSelectedSearchOption>
          <SbSearchOption slot-scope="{ option, index }">{{ index }} {{ option.displayName | i18 }}</SbSearchOption>
          <p slot="empty-options">I Couldn't Find Anything.</p>
        </SbSearchableInput>
        <SbFormHelperText>My helper text</SbFormHelperText>
      </SbField> -->

      <SbField>
        <SbLabel>My Label</SbLabel>
        <SbSearchableInput
          v-model="selectionBasicB"
          :options="optionsBasic"
          @search="handleSearchBasic"
          :loading="gatheringOptions"
          :showSelectedOptions="true"
        >
          <SbSelectedSearchOption slot="selection" slot-scope="{ selection }" :value="selection"></SbSelectedSearchOption>
          <SbSearchOption slot-scope="{ option, index }">{{ index }} {{ option | i18 }}</SbSearchOption>
          <!-- <SbSearchOption slot-scope="{ option, index }">{{ index }} {{ option.displayName | i18 }}</SbSearchOption> -->
          <!-- <p slot="empty-options">I Couldn't Find Anything.</p> -->
        </SbSearchableInput>
        <SbFormHelperText>My helper text</SbFormHelperText>
      </SbField>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SbSearchableInput from '@/components/SearchableInput/SearchableInputMachine.vue'
import SbSearchOption from '@/components/SearchableInput/SearchOption.vue'
import SbSelectedSearchOption from '@/components/SearchableInput/SelectedSearchOption.vue'

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
    SbSelectedSearchOption
  },
  data: () => ({
    selectionBasicA: [],
    selectionBasicB: null,
    selectionBasicC: [],
    selectionComplex: null,
    optionsBasic: null,
    optionsComplex: null,
    gatheringOptions: false

  }),
  methods: {
    handleSearchBasic ({ searchTerm }) {
      console.log(searchTerm)
      this.gatheringOptions = true
      setTimeout(() => {
        if (searchTerm.length > 3) this.optionsBasic = ['first', 'second', 'third', 'fourth', 'fifth', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        else this.optionsBasic = []
        this.gatheringOptions = false
      }, 1000)
    },
    handleSearchComplex ({ searchTerm }) {
      if (searchTerm.length > 4) this.optionsComplex = [{id: 1, displayName: "first"}, {id: 2, displayName: "second"}, {id: 3, displayName: "third"}, {id: 4, displayName: "fourth"}, {id: 5, displayName: "fifth"}]
      else this.optionsComplex = []
    }
  },
  filters: {
    i18 (value) {
      return value && value.toUpperCase()
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
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    .spacer {
      margin: 1em 0;
    }
  }
}
</style>
