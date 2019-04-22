<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <v-layout row wrap class="navbar-xs" style="z-index:999; position:absoulute;">
            <v-flex xs2>
                <!-- logo -->
                  <img style="margin-top:25px; margin-left:10px;" height="55px" width="" src="~@/assets/minilogo.png" />
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs3>
                <p style="font-size:12px;" @click="changeState('Branches')" class="navbar-fonttt underlinee">Branches</p>
            </v-flex>
            <v-flex xs2>
                <p  style="font-size:12px;" @click="changeState('Currencies')" class="navbar-fonttt underlinee">Currencies</p>
            </v-flex>
            <v-flex xs4>
              <div style="cursor:pointer;">
                  <p @click="signout" style="text-align:right; margin-right:20px; color:#3C84C5; font-weight:400; font-size:12px; margin-top:40px;">
                    <!-- <v-icon>person</v-icon> -->
                    Sign out
                    </p>
                </div>
            </v-flex>
        </v-layout>
        <div style="margin-top:160px;"></div>
        <Branches style="backgroun-color:#ffffff;" row wrap v-if="state === 'Branches'"></Branches>
        <Currencies style="backgroun-color:#ffffff;" row wrap v-if="state === 'Currencies'"></Currencies>
    </v-content>
</template>
<script>
import Branches from '@/components/xs/Branches'
import Currencies from '@/components/xs/Currency'
import Api from '@/api/api'
export default {
  mounted () {
    if (!Api.isLogined()) {
      this.$router.push({name: 'login'})
    }
    console.log(this.$router.history.current.params.state)
    this.state = this.$router.history.current.params.state || 'Branches'
  },
  methods: {
    changeState (e) {
      this.state = e
    },
    signout () {
      // window.location.replace('')
      let backlen = history.length
      localStorage.clear()
      history.go(-backlen)
      this.$router.push({name: 'login'})
    }
  },
  components: {
    Branches,
    Currencies
  },
  data () {
    return {
      state: 'Branches'
    }
  }
}
</script>
<style>
.navbar-fonttt {
    margin-top:40px;
    font-size: 15px;
    color: #707070;
    cursor: pointer;
}
.navbar-xs {
    height:100px;
    background-color:white;
    box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
}
.underlinee {
    letter-spacing:1px;
    display: inline-block;
    position:relative;
}
.underlinee:before{
  content:"";
  width:100%;
  background:linear-gradient(to right, white 50%, #3C84C5 50%);
}
.underlinee:after{
  content:"";
  width:100%;
  height:1px;
  left:0;
  bottom:0;
  position:absolute;
  z-index:9;
  background:linear-gradient(to right, #8B0000 60%, white 50%);
}
</style>
