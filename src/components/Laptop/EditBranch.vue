<template>
    <v-content>
        <v-progress-linear v-show="indeterminate" style="margin-top:0px;" :indeterminate="indeterminate"></v-progress-linear>
        <!-- Edit Branch -->
        <v-layout row wrap style="margin-top:50px;">
            <v-flex xs2></v-flex>
            <v-flex class="payload" xs8>
                <!-- add currency -->
                <v-layout row wrap>
                    <v-flex xs3 style="margin-left: 50px; margin-top:20px;">
                        <v-text-field class="login"
                            v-model="name"
                            label="BranchName"
                            single-line
                            outline
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <!-- add currency -->
                <v-layout row wrap>
                    <v-flex xs10>
                        <p class="add-cur" @click="addCurrency">
                            <v-icon >add</v-icon>
                            Add Currency
                        </p>
                    </v-flex>
                </v-layout>
                <div v-if="loaded">
                  <v-layout  row wrap v-for="(x, index) in rate" v-bind:key="x.index" style="border:solid 1px gray; margin-bottom:10px; background-color:#F0F0F0;">
                      <v-flex xs10>
                          <DynamicCurrency :allCur="allCur" :index="index" @pushTop="pushTop" :id="x.currency._id + index" :name="x.currency.name" :rate="rate" :denomination="x.denomination" :curencyList="curencyList" :flag="x.currency.flag"></DynamicCurrency>
                      </v-flex>
                      <v-flex xs2>
                          <v-icon @click="remove(index)" style="font-size:40px; padding-top:10px; color:red; cursor:pointer; ">clear</v-icon>
                      </v-flex>
                      <v-flex xs12>
                      </v-flex>
                  </v-layout>
                </div>
                <v-flex xs12 >
                <v-btn @click="save()" color="primary" block>save</v-btn>
            </v-flex>
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs12 style="margin-top:100px;"></v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import Denomination from '@/components/Laptop/Denomination'
import DynamicCurrency from '@/components/Laptop/DynamicCurrency'
import Api from '@/api/api'
export default {
  mounted () {
    if (!Api.isLogined()) {
      this.$router.push({name: 'login'})
    }
    const payload = {
      _id: this.$route.query.id
    }
    Api.getBranch(payload, x => {
      this.detail = x
      this.name = this.detail.name
      this.rate = this.detail.rates
      this.rate = this.rate.map((x, index) => ({...x, index}))
      Api.getAllCurrency(z => {
        this.allCur = z
        this.curencyList = z.map(y => y.name)
        this.loaded = true
        this.indeterminate = false
      })
    })
  },
  components: {
    Denomination,
    DynamicCurrency
  },
  data () {
    return {
      loaded: false,
      allCur: [],
      indeterminate: true,
      rate: [],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      curencyList: ['ss', 'sss'],
      name: '',
      detail: '',
      currencies: [],
      denomination: []
    }
  },
  methods: {
    reset () {
      const payload = {
        _id: this.$route.query.id
      }
      Api.getBranch(payload, x => {
        this.detail = x
        this.name = this.detail.name
        this.rate = this.detail.rates
        console.log(this.rate)
        Api.getAllCurrency(z => {
          this.allCur = z
          this.curencyList = z.map(y => y.name)
          this.loaded = true
          this.indeterminate = false
        })
      })
    },
    pushTop (e) {
      this.currencies[e.index] = e.payloadCurrency
    },
    remove (e) {
      this.rate.splice(e, 1)
      this.currencies.splice(e, 1)
    },
    save () {
      if (this.rate.length === 0 || this.currencies.length === 0) {
        return alert('There is nothing to save')
      }
      this.indeterminate = true
      const payload = {
        _id: this.$route.query.id,
        name: this.name,
        rates: this.currencies
      }
      Api.editBranch(payload, x => {
        switch (x) {
          case 400: {
            alert('please fill all the form')
            this.reset()
            this.indeterminate = false
            break
          }
          case 500: {
            alert('please fill all the form')
            this.reset()
            this.indeterminate = false
            break
          }
          case 401: {
            alert('Session Expired')
            this.indeterminate = false
            Api.resetToken()
            this.$router.push({name: 'login'})
            break
          }
          default: {
            this.indeterminate = false
            alert('successful')
            this.reset()
            break
          }
        }
      })
    },
    addCurrency () {
      this.rate.push({index: this.rate[this.rate.length - 1].index + 1, currency: {name: '', flag: ''}, denomination: ''})
    }
  }
}
</script>
<style>
.payload {
  height: auto;
  min-height: 500px;
  margin-top:50px;
  border-radius: 10px;
  border: solid 1px white;
  box-shadow: 2px 3px 3px rgba(0,0,0,0.25), 1px 10px 5px rgba(0,0,0,0.22);
}
.add-cur {
  text-align: left;
  cursor: pointer;
  transition: 0.4s;
  font-size:18px;
  margin-left:20px;
  margin-top:20px;
  color: #264089;
}
.add-cur:hover {
  color: #3C84C5;
  font-weight: 500;
}
.add-deno {
  text-align: left;
  cursor: pointer;
  transition: 0.4s;
  font-size:18px;
  margin-left:20px;
  margin-top:20px;
  color: #264089;
}
.flag {
    height: 60px;
  width: 100px;
  border: solid 1px;
  background-color: #F0F0F0;
  border-radius: 20px;
  transition: 0.4;
}
.add-deno:hover {
  color: #3C84C5;
  font-weight: 500;
}
</style>
