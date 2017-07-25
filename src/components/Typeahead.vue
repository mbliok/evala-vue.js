<template>
  <div  :class="classState">
    <div class="typehead-toggle" ref="toggle" @mousedown.prevent="toggle">
        <input type="text" class="typehead-search" ref="search"
          v-model="search"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.down="onDownKey"
          @keydown.up="onUpKey"
          @keydown.enter="onEnterKey"
        >
        <span class="typehead-text" ref="text">{{displayText}}</span>
    </div>
    <ul class="typehead-list" v-if="open">
     
        <li v-bind:class="{turnYouyself: logedUserId(suggestion)}" class="typehead-item" v-for="(suggestion, index) in filteredOptions" :key="index">
            <a  class="typehead-link" @mousedown.prevent="select(suggestion)"
            :class="[selectIndex === index ? 'active':'']"
            >
              {{suggestion.FullName}} <small class="pull-right" style="color:gray">{{suggestion.Email}}</small>
            </a>
        </li> 
    </ul>
  </div>
</template>

<script>
  import { userIdTest } from './../constant'

  export default {
    props: {
      suggestions: {
        type: Array,
        default() {
          return []
        }
      },

      value: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        open: false, // close dropdown by default
        selectIndex: 0,
        displayText: '',
        search: '',
        curentUserIs: userIdTest
      }
    },
    computed: {
      classState() {
        return this.open ? 'input_open' : 'input_default'
      },
      // Select user when typing in input
      filteredOptions() {
        const exp = new RegExp(this.search, 'i')
        return this.suggestions.filter((suggestion) => {
          return (exp.test(suggestion.Email) || exp.test(suggestion.FullName))  // Filter by id or FullName
        })
      }
    },
    methods: {
      // Disable select yourself
      logedUserId: function(suggestion) {
        return suggestion.id === this.curentUserIs
      },
     // Select user when click on dropdown list
      select(suggestion) {
        this.displayText = suggestion.FullName
        this.$emit('input', (suggestion.id))  // this.$emit =~ jQuery on() => this.$on('input'. To comunicate for not related components.
        this.$refs.search.blur()
      },

      toggle(e) {
        console.log('typing')
        if (e.target === this.$refs.toggle ||
            e.target === this.$refs.search ||
            e.target === this.$refs.text) {
          if (this.open) {
            if (e.target !== this.$refs.search && // close dropdown only if it isn't input or links
                e.target !== this.$refs.text) {
              this.$refs.search.blur()
            }
          } else {
            this.$refs.search.focus()
          }
        }
      },

      onFocus() {
        this.open = true
      },

      onBlur() {
        this.search = ''
        this.open = false
      },

      onDownKey() {
        if (this.filteredOptions.length - 1 > this.selectIndex) {
          this.selectIndex ++
        }
      },

      onUpKey() {
        if (this.selectIndex > 0) {
          this.selectIndex --
        }
      },

      onEnterKey() {
        const option = this.filteredOptions[this.selectIndex]
        if (option) {
          this.select(option)
        }
      }

    }
  }
</script>
<style>
  @import "./../styles/components/typeahead.scss";

  .typehead-item.turnYouyself{
      display: none;
      pointer-events: none;
      background:#f1f1f1;
  }
</style>
