<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <div style="height:auto;">
          <!-- <DesktopLanding v-show="$vuetify.breakpoint.name === 'lg'"></DesktopLanding> -->
          <DashboardXS v-show="$vuetify.breakpoint.name === 'xs'"></DashboardXS>
          <DashboardSM v-show="$vuetify.breakpoint.name === 'sm'"></DashboardSM>
          <DashboardMD v-show="$vuetify.breakpoint.name === 'md'"></DashboardMD>
          <DashboardLaptop v-show="$vuetify.breakpoint.name === 'lg'"></DashboardLaptop>
          <DashboardXL v-show="$vuetify.breakpoint.name === 'xl'"></DashboardXL>
        </div>
    </v-content>
</template>
<script>
import DashboardLaptop from '@/components/Laptop/Dashboard'
import DashboardSM from '@/components/sm/Dashboard.vue'
import DashboardMD from '@/components/md/Dashboard.vue'
import DashboardXL from '@/components/xl/Dashboard'
import DashboardXS from '@/components/xs/Dashboard'

export default {
  data () {
    return {
    }
  },
  components: {
    DashboardLaptop,
    DashboardXL,
    DashboardMD,
    DashboardSM,
    DashboardXS
  }
}
</script>
