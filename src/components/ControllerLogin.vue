<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <div style="height:auto;">
          <!-- <DesktopLanding v-show="$vuetify.breakpoint.name === 'lg'"></DesktopLanding> -->
          <XSLogin v-show="$vuetify.breakpoint.name === 'xs'"></XSLogin>
          <SMLogin v-show="$vuetify.breakpoint.name === 'sm'"></SMLogin>
          <MdLogin v-show="$vuetify.breakpoint.name === 'md'"></MdLogin>
          <LaptopLogin v-show="$vuetify.breakpoint.name === 'lg'"></LaptopLogin>
          <DesktopLogin v-show="$vuetify.breakpoint.name === 'xl'"></DesktopLogin>
        </div>
    </v-content>
</template>
<script>
import LaptopLogin from '@/components/Laptop/Login'
import XSLogin from '@/components/xs/Login'
import SMLogin from '@/components/sm/Login'
import MdLogin from '@/components/md/Login'
import DesktopLogin from '@/components/xl/Login'
export default {
  data () {
    return {
    }
  },
  components: {
    LaptopLogin,
    DesktopLogin,
    MdLogin,
    SMLogin,
    XSLogin
  },
  methods: {
    change (e) {
      //
    }
  }
}
</script>
