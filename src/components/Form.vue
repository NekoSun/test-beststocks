<template>
  <div class="calk">
      <div class="form">
        <div class="fractions" v-for="(fraction, index) in fractions" :key="index">
          <Fraction
            v-if="render"
            :index="index"
            :del="fractions.length > 2 ? true : false"
            :numeratorVal="fraction.numerator"
            :denominatorVal="fraction.denominator"
            @numerator="numerator"
            @denominator="denominator"
            @del="del"
          />
          <div v-if="fractions.length !== index + 1" class="form__plas">+</div>
          <div v-else class="form__plas">=</div> 
        </div>
        <div class="result">
          <div class="result__numerator">{{resultVal.numerator}}</div>
          <div class="hr"></div>
          <div class="result__denominator">{{resultVal.denominator}}</div>
        </div>
        
      </div>
      <AddFraction 
        @click="fractions.length > 4 ? error=true : fractions.push({numerator: '', denominator: ''})"
      />
      <div v-if="error">не более 5 дробей</div>
    </div>
</template>

<script>
import Fraction from '@/components/Fraction'
import AddFraction from '@/components/AddFraction'
export default {
  name: 'Form',
  components: {
    Fraction,
    AddFraction
  },
  data() {
    return {
      fractions: [
        {
          numerator: '',
          denominator: ''
        },
        {
          numerator: '',
          denominator: ''
        }
      ],
      render: true,
      error: false,
      resultVal: {
        numerator: null,
        denominator: null
      }
    }
  },
  computed: {
    result: {
        get() {
            return this.resultVal
        },
        set(val) {
          const A = []
          val.forEach(element => {
            A.push(element.denominator)
          })
          function NOK(A) {
            let n = A.length
            let a = Math.abs(A[0])
            for (let i = 1; i < n; i++) {
              let b = Math.abs(A[i])
              let c = a 
              while (a && b) {
                a > b ? a %= b : b %= a
              }
              a = Math.abs(c*A[i])/(a+b)
            }
            return a
          }
          this.resultVal.denominator = NOK(A)

          let numerator = val.map(item => item.numerator * (this.resultVal.denominator / item.denominator))
          console.log('numerator', numerator)

          this.resultVal.numerator = numerator.reduce((a, b) => a + b)
        }
    },
  },
  watch: {
    fractions: {
      handler: function (val) {

        let test = ''
        val.forEach(element => {
          if (element.numerator === '' || element.denominator === '' ) {
            test = true
            return 
          }
        })

        if (test) {
          this.resultVal.numerator = 'не все поля заполнены'
          this.resultVal.denominator = 'не все поля заполнены'
        } else {
          this.result = val
        }

      }, 
      deep: true,
    }
  },
  methods: {
    numerator(val) {
      this.fractions[val.index].numerator = val.numerator
    },
    denominator(val) {
      this.fractions[val.index].denominator = val.denominator
    },
    del(val) {
      if (this.fractions.length < 6) {
        this.error = false
      }
      this.$nextTick()
        .then(() => {
          this.render = false
        })
        .then(() => {
          this.fractions = this.fractions.filter(function(item, index) {
            return index !== val
          })
        })
        .then(() => {
          this.render = true
        })
    }
  }
}
</script>

<style scoped lang="scss">
.calk {
  text-align: left;
}
.form{
  display: flex;
  .fractions {
    display: flex;
    align-items: center;

  }
  &__plas{
    margin: 0 10px;
  }
}

.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 40px;
  .hr {
        height: 2px;
        background-color: #000;
        margin: 5px 0;
    }
}
</style>
