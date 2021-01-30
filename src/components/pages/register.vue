<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="4" sm="4"></v-col>  
                <v-col cols="4" sm="4">
                    <v-card class=pa-6>
                        <v-card-title>
                            Create an account.
                        </v-card-title>
                        <v-card-subtitle>
                            It's free too.
                        </v-card-subtitle>                
                        <v-text-field
                            label="Account URL"
                            placeholder="something short and memorable"
                            outlined                      
                        ></v-text-field>        
                    </v-card>
                </v-col>
                <v-col cols="4" sm="4"></v-col>  
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
  export default {
    name: 'Register',    
    data: () => ({
    }),
  }
</script>