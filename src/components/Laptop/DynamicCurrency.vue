<template>
    <v-content>
        <!-- Currency -->
        <v-layout row wrap style="">
            <v-flex xs2></v-flex>
            <!-- name -->
            <v-flex xs3>
                <v-select
                    v-model="tempName"
                    :items="displayCurrency"
                    style="width:100%; z-index:0;"
                    label="Currency"
                    single-line>
                </v-select>
            </v-flex>
            <!-- flag -->
            <v-flex xs2>
                <div style="z-index:900;" v-if="tempFlag !== ''">
                    <img style="margin-top:20px; z-index:20;" v-bind:src="'data:image/jpeg;base64,'+ tempFlag" />
                </div>
            </v-flex>
            <v-flex xs5></v-flex>
            <!-- add denomination -->
            <v-flex xs3></v-flex>
            <v-flex xs6>
                <p  @click="addDenomination" class="add-cur" >
                    <v-icon>add</v-icon>
                    Add Denomination
                </p>
            </v-flex>
            <v-flex xs3></v-flex>
            <!-- header -->
            <v-layout row wrap>
                <v-flex xs4></v-flex>
                <v-flex xs7 style="border:solid 1px white; background-color:white; border-radius:2px;  margin-bottom:5px;">
                  <v-layout row wrap>
                    <v-flex xs4 style="">
                      <div style=" margin-left:10px; margin-right:10px;">
                        <p style="margin-top:10px; color:#264089;">Bill</p>
                      </div>
                    </v-flex>
                    <v-flex xs4 style="">
                      <div style=" margin-left:10px; margin-right:10px;">
                        <p style="margin-top:10px; color:#C41414;">Buy</p>
                      </div>
                    </v-flex>
                    <v-flex xs4 style="">
                      <div style=" margin-left:10px; margin-right:10px;">
                        <p style="margin-top:10px; color:green;">Sell</p>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs1 style="">
                  <!-- <div style="border-radius:2px; width:120%; margin-bottom:5px;">
                      <p style="margin-top:10px; fonts-size:15px; color:red; margin-right:10px;">Delete</p>
                  </div> -->
                </v-flex>
            </v-layout>
            <v-layout style="width:250%;" row wrap v-for="(x, index) in tempDenomination" v-bind:key="x.index">
                <!-- Body -->
                <v-flex xs4></v-flex>
                <v-flex xs7 style="">
                    <Denomination :bill="x.bill" :buy="x.buy" :sell="x.sell" :index="index" @push="handlePush" ref="form" :name="x" :curencyList="x" :flag="x"></Denomination>
                </v-flex>
                <v-flex xs1 style="width:120%;">
                  <div style="width:120%;">
                    <v-icon @click="remove('index')" style="font-size:30px;   padding-top:20px; color:red; cursor:pointer;">clear</v-icon>
                  </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap style="margin-top:35px;"></v-layout>
        </v-layout>
    </v-content>
</template>
<script>
import Denomination from '@/components/Laptop/Denomination'
export default {
  components: {
    Denomination
  },
  props: ['allCur', 'name', 'flag', 'curencyList', 'denomination', 'rate', 'index', 'id'],
  mounted () {
    this.tempName = this.name.substring(0, 10)
    this.tempDenomination = this.denomination || []
    this.tempDenomination = this.tempDenomination.map((x, index) => ({...x, index}))
    console.log(this.tempDenomination, 'ss', this.tempDenomination[0].index)
    this.displayCurrency = this.curencyList.map(x => x.substring(0, 10))
    this.tempFlag = this.flag
    this.tempId = this.id
  },
  watch: {
    tempName: function () {
      let a = this.curencyList.filter(x => x.startsWith(this.tempName))[0]
      this.tempFlag = this.allCur.filter(x => x.name === a)[0].flag
      this.tempId = this.allCur.filter(x => x.name === a)[0]._id
      this.$emit('pushTop', { index: this.index, payloadCurrency: {currency: this.tempId, flag: this.tempFlag, denomination: this.tempDenomination} })
    }
  },
  methods: {
    handlePush (e) {
      this.tempDenomination[e.index] = e.payload
      this.$emit('pushTop', { index: this.index, payloadCurrency: {currency: this.tempId, flag: this.tempFlag, denomination: this.tempDenomination} })
    },
    lol () {
      this.$refs.form.lol()
    },
    addDenomination () {
      console.log(this.tempDenomination, '=======')
      console.log(this.tempDenomination[0].index, '==')
      this.tempDenomination.push({index: this.tempDenomination[this.tempDenomination.length - 1].index + 1, bill: '', sell: '', buy: ''})
      // console.log(this.tempDenomination, this.tempDenomination.length)
    },
    remove (e) {
      this.tempDenomination.splice(e, 1)
    }
  },
  data () {
    return {
      tempId: '',
      tempName: '',
      ff: 'ff',
      tempFlag: '',
      tempDenomination: [],
      displayCurrency: []
    }
  }
}
</script>
