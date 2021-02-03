<template>
  <v-app>
    <span>Initial Account</span>
  </v-app>
</template>

<script>
//import axios from "axios";
import simplebookService from "../../services/simplebook.services";

//console.log("This is really it: " + axios.defaults.headers.common['x-access-token']);

simplebookService.displayAccount().then(response => {
  console.log(response.data);
});

export default {
  
}
</script>