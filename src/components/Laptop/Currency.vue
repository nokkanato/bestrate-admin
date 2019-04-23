<template>
    <v-layout row wrap style="">
        <v-progress-linear v-show="indeterminate" style="margin-top:0px;" :indeterminate="indeterminate"></v-progress-linear>
        <v-flex xs2></v-flex>
        <v-flex class="payload" style="margin-top:120px;"  xs8>
            <!-- add currency -->
            <v-layout row wrap>
                <v-flex xs10>
                    <p class="add-cur" @click="addCurrency">
                        <v-icon >add</v-icon>
                        Add Currency
                    </p>
                </v-flex>
            </v-layout>
            <!-- Currency -->
            <div v-if="loaded">
              <DynamicAddCurrency  :index="index" @handle="handle" @reset="reset" :id="x._id" :name="x.name" :flag="x.flag" style="margin-left:100px;" v-for="(x, index) in currencies" v-bind:key="index"></DynamicAddCurrency>
            </div>
        </v-flex>
        <v-flex xs2></v-flex>
    </v-layout>
</template>
<script>
import DynamicAddCurrency from '@/components/Laptop/DynamicAddCurrency'
import Api from '@/api/api'
export default {
  components: {
    DynamicAddCurrency
  },
  mounted () {
    this.indeterminate = true
    Api.getAllCurrency(x => {
      this.currencies = x
      this.currencies = this.currencies.map((x, index) => ({...x, index}))
      this.loaded = true
      this.indeterminate = false
    })
  },
  methods: {
    handle (e) {
      this.currencies.splice(e.index, 1)
    },
    reset () {
      this.indeterminate = true
      this.loaded = false
      Api.getAllCurrency(x => {
        this.currencies = x
        this.currencies = this.currencies.map((x, index) => ({...x, index}))
        this.indeterminate = false
        this.loaded = true
      })
    },
    delCurrency (index) {
      this.currencies.splice(index, 1)
    },
    addCurrency () {
      this.currencies.push({index: this.currencies[this.currencies.length - 1].index + 1, _id: '', name: '', flag: ''})
    }
  },
  data () {
    return {
      currencies: [],
      loaded: false,
      indeterminate: false
    }
  }
}
</script>
<style>
.add-flag {
  height: 60px;
  width: 100px;
  background-color: #F0F0F0;
  border-radius: 20px;
  transition: 0.4;
  cursor: pointer;
}
.add-flag:hover {
  color: white;
  font-weight: 500;
  background-color: #264089;
}

.element-edit {
  padding-top:15px;
  font-size: 16px;
  font-weight: 300;
  color: #3C84C5;
  cursor: pointer;
  transition: 0.3s;
}
.element-delete {
  padding-top:15px;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 300;
  color:#C41414;
  padding-left:20px;
  cursor: pointer;
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
.payload {
  height: auto;
  min-height: 500px;
  margin-top:50px;
  border-radius: 10px;
  border: solid 1px white;
  box-shadow: 2px 3px 3px rgba(0,0,0,0.25), 1px 10px 5px rgba(0,0,0,0.22);
}
</style>
