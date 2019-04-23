<template>
    <v-content>
        <!-- Currency -->
        <v-layout row wrap style="">
            <v-flex xs1></v-flex>
            <!-- name -->
            <v-flex xs4>
                <v-select
                    hide-details
                    v-model="tempName"
                    :items="displayCurrency"
                    label="Currency"
                    single-line>
                </v-select>
            </v-flex>
            <v-flex xs2></v-flex>
            <!-- flag -->
            <v-flex xs2>
                <div v-if="tempFlag !== ''" >
                  <img style="margin-top:20px;" v-bind:src="'data:image/jpeg;base64,'+ tempFlag" />
                </div>
            </v-flex>
            <!-- add denomination -->
            <v-flex xs12>
                <p  @click="addDenomination" class="add-cur" >
                    <v-icon>add</v-icon>
                    Add Denomination
                </p>
            </v-flex>
            <!-- header -->
            <v-layout row wrap>
                <v-flex xs2></v-flex>
                <v-flex xs8 style="border:solid 1px white; background-color:white; border-radius:2px;  margin-bottom:5px;">
                  <v-layout row wrap>
                    <v-flex xs4 style="">
                      <div style=" margin-left:2px; margin-right:2px;">
                        <p style="margin-top:10px; color:#264089;">Bill</p>
                      </div>
                    </v-flex>
                    <v-flex xs4 style="">
                      <div style=" margin-left:2px; margin-right:2px;">
                        <p style="margin-top:10px; color:#C41414;">Buy</p>
                      </div>
                    </v-flex>
                    <v-flex xs4 style="">
                      <div style="margin-left:2px; margin-right:2px;">
                        <p style="margin-top:10px; color:green;">Sell</p>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs2 style="">
                </v-flex>
            </v-layout>
            <v-layout style="" row wrap v-for="(x, index) in tempDenomination" v-bind:key="index">
                <v-flex xs2></v-flex>
                <v-flex xs8 style="width:100%;">
                    <Denomination :bill="x.bill" :buy="x.buy" :sell="x.sell" :index="index" @push="handlePush" ref="form" :name="x" :curencyList="x" :flag="x"></Denomination>
                </v-flex>
                <v-flex xs2>
                    <v-icon @click="remove('index')" style="font-size:30px; padding-top:20px; color:red; cursor:pointer;">clear</v-icon>
                </v-flex>
            </v-layout>
            <v-flex xs12 style="margin-top:20px;"></v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import Denomination from '@/components/xs/Domination'
export default {
  components: {
    Denomination
  },
  props: ['allCur', 'name', 'flag', 'curencyList', 'denomination', 'rate', 'index', 'id'],
  mounted () {
    this.tempName = this.name.substring(0, 10)
    this.tempDenomination = this.denomination || []
    this.tempDenomination = this.tempDenomination.map(x => x)
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
      this.tempDenomination.push({name: '', flag: ''})
    },
    remove (e) {
      this.tempDenomination.splice(e, 1)
    }
  },
  data () {
    return {
      displayCurrency: [],
      tempId: '',
      tempName: '',
      ff: 'ff',
      tempFlag: '',
      tempDenomination: []
    }
  }
}
</script>
