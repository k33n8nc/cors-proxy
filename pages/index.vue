<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="postalCode"
              label="Postcode"
              required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="houseNumber"
              label="Huisnummer"
              required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="houseNumberExtention"
              label="Huisnr. toevoeging"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- New fields for response data -->
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="city"
              label="City"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="street"
              label="Street"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="province"
              label="Province"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn @click="submitForm" class="mt-2" block>Submit</v-btn>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>{{ apiResult }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const valid = ref(true)
    const postalCode = ref('')
    const houseNumber = ref('')
    const houseNumberExtention = ref('')
    const city = ref('')
    const street = ref('')
    const province = ref('')
    const apiResult = ref('') // Reactive variable to store API result

    const submitForm = async () => {
      if (valid.value) {
        try {
          const response = await fetch(`/api/?postcode=${postalCode.value}&number=${houseNumber.value}`, {
            headers: {
              token: '30c451a0-9e13-4298-96bf-a34c13f6df5f',
            },
          })
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()
          apiResult.value = JSON.stringify(data, null, 2) // Display the result

          // Update fields with response data
          city.value = data.city
          street.value = data.street
          province.value = data.province
        } catch (error) {
          apiResult.value = `Error: ${error.message}`
        }
      }
    }

    return {
      valid,
      postalCode,
      houseNumber,
      houseNumberExtention,
      city,
      street,
      province,
      apiResult,
      submitForm,
    }
  },
}
</script>