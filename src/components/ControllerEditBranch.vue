<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <v-layout row wrap class="navbar" v-show="$vuetify.breakpoint.name === 'md' || $vuetify.breakpoint.name === 'lg' || $vuetify.breakpoint.name === 'xl'">
            <v-flex xs2>
                <!-- logo -->
                <img  style="margin-top:15px; margin-left:10px;" height="65px" width="" src="~@/assets/logo.png" />
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2>
                <p @click="goto('Branches')" class="navbar-font underline">Branches</p>
            </v-flex>
            <v-flex xs2>
                <p @click="goto('Currencies')" class="navbar-font underline">Currencies</p>
            </v-flex>
            <v-flex xs4>
              <div style="cursor:pointer;">
                  <p @click="signout" style="text-align:right; margin-right:20px; color:#3C84C5; font-weight:400; font-size:18px; margin-top:35px;">
                    <!-- <v-icon>person</v-icon> -->
                    Sign out
                    </p>
                </div>
            </v-flex>
        </v-layout>
        <!-- mobile nav bar -->
        <v-layout row wrap class="navbar" v-show="$vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'xs'">
            <v-flex xs2>
                <!-- logo -->
                  <img style="margin-top:25px; margin-left:10px;" height="55px" width="" src="~@/assets/minilogo.png" />
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs3>
                <p style="font-size:12px;" @click="goto('Branches')" class="navbar-fonttt underlinee">Branches</p>
            </v-flex>
            <v-flex xs2>
                <p  style="font-size:12px;" @click="goto('Currencies')" class="navbar-fonttt underlinee">Currencies</p>
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
        <div v-show="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'" style="margin-top:160px;"></div>
        <!-- Edit branch -->
        <XSEdit style="margin-top:100px;" v-show="$vuetify.breakpoint.name === 'xs'"></XSEdit>
        <SMEdit style="margin-top:100px;" v-show="$vuetify.breakpoint.name === 'sm'"></SMEdit>
        <MDEdit style="margin-top:100px;" v-show="$vuetify.breakpoint.name === 'md'"></MDEdit>
        <LaptopEdit style="margin-top:100px;" v-show="$vuetify.breakpoint.name === 'lg'"></LaptopEdit>
        <XLEdit style="margin-top:100px;" v-show="$vuetify.breakpoint.name === 'xl'"></XLEdit>
    </v-content>
</template>
<script>
import Api from '@/api/api'
import XSEdit from '@/components/xs/EditBranch'
import SMEdit from '@/components/sm/EditBranch'
import MDEdit from '@/components/md/EditBranch'
import LaptopEdit from '@/components/Laptop/EditBranch'
import XLEdit from '@/components/xl/EditBranch'
export default {
  mounted () {
    if (!Api.isLogined()) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    changeState (e) {
      this.state = e
    },
    goto (e) {
      this.$router.push({name: `DashBoard`, params: {state: e}})
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
    SMEdit,
    LaptopEdit,
    XLEdit,
    MDEdit,
    XSEdit
  },
  data () {
    return {
      state: 'Currencies'
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
.underline {
    color:#3C84C5; font-size:30px;
    letter-spacing:1px;
    display: inline-block;
    position:relative;
}
.underline:before{
  content:"";
  width:100%;
  background:linear-gradient(to right, white 50%, #3C84C5 50%);
}
.underline:after{
  content:"";
  width:100%;
  height:3px;
  left:0;
  bottom:0;
  position:absolute;
  z-index:9;
  background:linear-gradient(to right, #3C84C5 60%, white 50%);
}
.navbar-font {
    margin-top:25px;
    font-size: 20px;
    color: #707070;
    cursor: pointer;
}
.navbar {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    height:100px;
    background-color:white;
    box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
}
</style>
