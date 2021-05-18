<template>
  <div class="fractions">
    <input class="fraction" type="text" v-model="numerator" v-filter="'[1-9]'" :maxlength="max">
    <div class="hr"></div>
    <input class="fraction" type="text" v-model="denominator" v-filter="'[1-9]'" :maxlength="max">
    <div v-if="del" class="fraction__del" @click="$emit('del', index)">+</div>
  </div>
</template>

<script>
export default {
  name: "Fraction",
  props: {
    numeratorVal: {
        type: String,
        default: ''
    },
    denominatorVal: {
        type: String,
        default: ''
    },
    index: {
        type: Number,
        default: null
    },
    del: {
        type: Boolean,
        default: false
    }
  },
   data() {
    return {
        max: 2
    }
},
  computed: {
    numerator: {
        get() {
            return this.numeratorVal
        },
        set(val) {
            this.$emit('numerator', {numerator: val, index: this.index})
        }
    },
    denominator: {
        get() {
            return this.denominatorVal
        },
        set(val) {
            this.$emit('denominator', {denominator: val, index: this.index})
        }
    }
  }
};
</script>

<style scoped lang="scss">
.fractions {
    position: relative;
    display : flex;
    flex-direction: column;
    align-items: center;

    .hr {
        height: 2px;
        width: 65px;
        background-color: #000;
        margin: 5px 0;
    }

    .fraction {
        width: 50px;
        height: 50px;
        border: 1px solid #000;

        font-size: 40px;
        text-align: center;

        &__del {
            position: absolute;
            right: -22px;
            top: -12px;
            background-color: rgb(189, 189, 189);
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
}
</style>
