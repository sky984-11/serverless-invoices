<template>  
    <div class="search-popover__container">  
        <div class="editable__item"  
             :class="btnClasses"  
             ref="button"  
             :tabindex="tabindex"  
             @click="toggleOpen">  
            <span v-if="!value" class="d-print-none">{{ $t('company') }}</span>  
            <span v-else>{{ value }}</span>  
        </div>  
        <div class="search-popover__overlay" v-if="isOpen" @click="toggleOpen"></div>  
        <VueAutosuggest  
                class="search-popover__select"  
                v-show="isOpen"  
                ref="suggest"  
                :input-props="{placeholder: $t('suggest_placeholder'), class: 'form-control'}"  
                :suggestions="suggestions"  
                :value="query"  
                :get-suggestion-value="getSuggestionValue"  
                :should-render-suggestions="shouldRenderSuggestions"  
                @input="onInput"  
                @change="onChange"  
                @selected="onSelected"  
                @keydown.esc="toggleOpen"  
                @keydown.tab="toggleOpen"  
                @keydown.down="onKeyDown"  
                @keydown.ctrl.enter="createNewCompany"  
        >  
            <template slot-scope="{ suggestion }">  
                <span>{{ suggestion.item.company_name }}</span>  
            </template>  
            <template slot="after-suggestions">  
                <button class="btn btn-link mt-2"  
                        ref="createNewButton"  
                        @click="createNewCompany"  
                        @keydown.up="returnToSuggestions">  
                    <i class="material-icons material-icons-round md-18">add</i>  
                    {{ $t('create') }} {{this.query ? `"${this.query}"` : $t('new')}}  
                    <code class="ml-2 badge badge-secondary">ctrl + enter</code>  
                </button>  
            </template>  
        </VueAutosuggest>  
    </div>  
</template>  
  
<script>  
import { VueAutosuggest } from 'vue-autosuggest';  
  
export default {  
  i18nOptions: { namespaces: 'company-selector' },  
  components: {  
    VueAutosuggest,  
  },  
  props: {  
    value: {},  
    btnClass: {},  
  },  
  data() {  
    return {  
      isOpen: false,  
      query: '',  
      tabindex: 0,  
    };  
  },  
  computed: {  
    suggestions() {  
      return [{  
        data: [  
          ...this.$store.getters['companies/all'] || [],  
        ]  
          .filter(company => !this.query || company.company_name.toLowerCase()  
            .indexOf(String(this.query)  
              .toLowerCase()) !== -1),  
      }];  
    },  
  },  
  methods: {  
    toggleOpen() {  
      this.isOpen = !this.isOpen;  
    },  
    onSelected(suggestion) {  
      if (suggestion) {  
        this.$emit('selected', suggestion.item);  
        this.close();  
      }  
    },  
    async createNewCompany() {  
      if (this.query.length) {  
        const company = await this.$store.dispatch('companies/createNewCompany', { company_name: this.query });  
        this.$emit('selected', company);  
      }  
      this.close();  
    },  
    close() {  
      this.isOpen = false;  
      this.query = '';  
    },  
  },  
};  
</script>