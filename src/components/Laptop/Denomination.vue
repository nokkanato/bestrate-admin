<template>
    <v-layout row wrap style="height:auto;  border-bottom:solid 1px gray; background-color:white;">
        <!-- body -->
        <v-flex xs4 style="height:0px;">
            <div style=" margin-left:10px; margin-right:10px;">
              <div style="margin-left:20px; margin-right:20px;">
                <v-text-field  class="login"
                    label="Bill"
                    single-line
                    v-model="tempBill"
                ></v-text-field>
              </div>
            </div>
        </v-flex>
        <v-flex xs4 style="">
          <div style=" margin-left:10px; margin-right:10px;">
            <div style="margin-left:20px; margin-right:20px;">
              <v-text-field class="login"
                  label="Sell"
                  single-line
                  v-model="tempSell"
              ></v-text-field>
            </div>
          </div>
        </v-flex>
        <v-flex xs4 style="">
          <div style=" margin-left:10px; margin-right:10px;">
            <div style="margin-left:20px; margin-right:20px;">
              <v-text-field class="login"
                  label="Buy"
                  v-model="tempBuy"
                  single-line
              ></v-text-field>
            </div>
          </div>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
  props: ['index', 'buy', 'sell', 'bill'],
  mounted () {
    this.tempBill = this.bill
    this.tempBuy = this.buy
    this.tempSell = this.sell
  },
  watch: {
    tempBill: function () {
      if (this.tempBill && this.tempSell && this.tempBuy) {
        if (this.tempBill !== this.bill) {
          this.$emit('push', {index: this.index, payload: {bill: this.tempBill, sell: this.tempSell, buy: this.tempBuy}})
        }
      }
    },
    tempBuy: function () {
      if (this.tempBill && this.tempSell && this.tempBuy) {
        if (this.tempBuy !== this.buy) {
          this.$emit('push', {index: this.index, payload: {bill: this.tempBill, sell: this.tempSell, buy: this.tempBuy}})
        }
      }
    },
    tempSell: function () {
      if (this.tempBill && this.tempSell && this.tempBuy) {
        if (this.tempSell !== this.sell) {
          this.$emit('push', {index: this.index, payload: {bill: this.tempBill, sell: this.tempSell, buy: this.tempBuy}})
        }
      }
    }
  },
  data () {
    return {
      mask: 'n',
      tempBill: '',
      tempSell: '',
      tempBuy: ''
    }
  },
  methods: {
    lol () {
      alert('kuy')
    }
  }
}
</script>
