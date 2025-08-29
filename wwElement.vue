<template>
  <div class="country-code-selector" :class="{ 'is-open': isDropdownOpen }">
    <div class="phone-input-container" :style="containerStyle">
      <div class="flag-container" @click="toggleDropdown">
        <div class="selected-flag">
          <img 
            v-if="selectedCountry?.flag" 
            :src="selectedCountry.flag" 
            :alt="selectedCountry?.name || 'Country flag'" 
            class="flag-img"
          />
          <span class="arrow-down" :class="{ 'rotated': isDropdownOpen }"></span>
        </div>
        
        <div v-if="isDropdownOpen" class="country-dropdown" :style="dropdownStyle">
          <!-- ✅ CONDITIONNEL : Afficher la searchbar seulement si showSearchBar est true -->
          <div v-if="content.showSearchBar !== false" class="search-container">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              :placeholder="content.searchPlaceholder || 'Search countries...'"
              class="search-input"
              :style="searchInputStyle"
              @click.stop
            />
          </div>
          <div class="countries-list" :style="countriesListStyleComputed">
            <div 
              v-for="country in filteredCountries" 
              :key="country.code" 
              class="country-item"
              :class="{ 'selected': selectedCountry?.code === country.code }"
              :style="[itemStyle, getItemVariables(country)]"
              @click.stop="selectCountry(country)"
            >
              <img :src="country.flag" :alt="country.name" class="flag-img" />
              <span class="country-name">{{ country.name }} (+{{ country.dialCode }})</span>
            </div>
            <div v-if="filteredCountries.length === 0" class="no-results">
              No countries found
            </div>
          </div>
        </div>
      </div>
      
      <div class="input-wrapper">
        <input
          ref="phoneInput"
          type="tel"
          :value="displayValue"
          @input="onInput"
          @keydown="onKeyPress"
          @paste="onPaste"
          @focus="handleFocus"
          @blur="handleBlur"
          :placeholder="isFocused || phoneValue ? '' : content.placeholder"
          class="phone-input"
          :style="inputStyle"
        />
        <label 
          v-if="content.label" 
          class="input-label"
          :class="{ 'active': isFocused || phoneValue }"
          :style="labelStyle"
        >
          {{ content.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { parsePhoneNumberFromString, AsYouType, getCountryCallingCode } from 'libphonenumber-js';

export default {
  props: {
    content: { 
      type: Object, 
      required: true 
    },
    uid: { 
      type: String, 
      required: true 
    },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Editor state
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Component state
    const isDropdownOpen = ref(false);
    const isFocused = ref(false);
    const phoneInput = ref(null);
    const searchInput = ref(null);
    const searchQuery = ref('');
    
    // Internal value management - Variables multiples
    const { value: phoneValue, setValue: setPhoneValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'value',
      type: 'string',
      defaultValue: computed(() => props.content.initialValue || '')
    });

    const { value: countryValue, setValue: setCountryValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'country',
      type: 'string',
      defaultValue: ''
    });

    const { value: dialCodeValue, setValue: setDialCodeValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'dialCode',
      type: 'string',
      defaultValue: ''
    });

    const { value: phoneNumberValue, setValue: setPhoneNumberValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'phoneNumber',
      type: 'string',
      defaultValue: ''
    });

    const { value: fullPhoneNumberValue, setValue: setFullPhoneNumberValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'fullPhoneNumber',
      type: 'string',
      defaultValue: ''
    });

    const { value: continentValue, setValue: setContinentValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'continent',
      type: 'string',
      defaultValue: ''
    });

    // Complete countries data with all countries, their phone number lengths and continents
    const countries = ref([
      // Europe
      { name: 'Albania', code: 'AL', dialCode: '355', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg', digits: 9, continent: 'EU' },
      { name: 'Andorra', code: 'AD', dialCode: '376', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg', digits: 6, continent: 'EU' },
      { name: 'Armenia', code: 'AM', dialCode: '374', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg', digits: 8, continent: 'EU' },
      { name: 'Austria', code: 'AT', dialCode: '43', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg', digits: 10, continent: 'EU' },
      { name: 'Azerbaijan', code: 'AZ', dialCode: '994', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg', digits: 9, continent: 'EU' },
      { name: 'Belarus', code: 'BY', dialCode: '375', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg', digits: 9, continent: 'EU' },
      { name: 'Belgium', code: 'BE', dialCode: '32', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg', digits: 9, continent: 'EU' },
      { name: 'Bosnia and Herzegovina', code: 'BA', dialCode: '387', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg', digits: 8, continent: 'EU' },
      { name: 'Bulgaria', code: 'BG', dialCode: '359', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg', digits: 8, continent: 'EU' },
      { name: 'Croatia', code: 'HR', dialCode: '385', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg', digits: 8, continent: 'EU' },
      { name: 'Cyprus', code: 'CY', dialCode: '357', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg', digits: 8, continent: 'EU' },
      { name: 'Czech Republic', code: 'CZ', dialCode: '420', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg', digits: 9, continent: 'EU' },
      { name: 'Denmark', code: 'DK', dialCode: '45', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg', digits: 8, continent: 'EU' },
      { name: 'Estonia', code: 'EE', dialCode: '372', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg', digits: 7, continent: 'EU' },
      { name: 'Finland', code: 'FI', dialCode: '358', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg', digits: 9, continent: 'EU' },
      { name: 'France', code: 'FR', dialCode: '33', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg', digits: 9, allowZeroPrefix: true, continent: 'EU' },
      { name: 'Georgia', code: 'GE', dialCode: '995', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg', digits: 9, continent: 'EU' },
      { name: 'Germany', code: 'DE', dialCode: '49', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg', digits: 11, continent: 'EU' },
      { name: 'Greece', code: 'GR', dialCode: '30', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg', digits: 10, continent: 'EU' },
      { name: 'Hungary', code: 'HU', dialCode: '36', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg', digits: 9, continent: 'EU' },
      { name: 'Iceland', code: 'IS', dialCode: '354', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg', digits: 7, continent: 'EU' },
      { name: 'Ireland', code: 'IE', dialCode: '353', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg', digits: 9, continent: 'EU' },
      { name: 'Italy', code: 'IT', dialCode: '39', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg', digits: 10, continent: 'EU' },
      { name: 'Kazakhstan', code: 'KZ', dialCode: '7', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg', digits: 10, continent: 'EU' },
      { name: 'Latvia', code: 'LV', dialCode: '371', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg', digits: 8, continent: 'EU' },
      { name: 'Liechtenstein', code: 'LI', dialCode: '423', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg', digits: 7, continent: 'EU' },
      { name: 'Lithuania', code: 'LT', dialCode: '370', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg', digits: 8, continent: 'EU' },
      { name: 'Luxembourg', code: 'LU', dialCode: '352', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg', digits: 9, continent: 'EU' },
      { name: 'Malta', code: 'MT', dialCode: '356', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg', digits: 8, continent: 'EU' },
      { name: 'Moldova', code: 'MD', dialCode: '373', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg', digits: 8, continent: 'EU' },
      { name: 'Monaco', code: 'MC', dialCode: '377', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg', digits: 8, continent: 'EU' },
      { name: 'Montenegro', code: 'ME', dialCode: '382', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg', digits: 8, continent: 'EU' },
      { name: 'Netherlands', code: 'NL', dialCode: '31', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg', digits: 9, continent: 'EU' },
      { name: 'North Macedonia', code: 'MK', dialCode: '389', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg', digits: 8, continent: 'EU' },
      { name: 'Norway', code: 'NO', dialCode: '47', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg', digits: 8, continent: 'EU' },
      { name: 'Poland', code: 'PL', dialCode: '48', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg', digits: 9, continent: 'EU' },
      { name: 'Portugal', code: 'PT', dialCode: '351', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg', digits: 9, continent: 'EU' },
      { name: 'Romania', code: 'RO', dialCode: '40', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg', digits: 9, continent: 'EU' },
      { name: 'Russia', code: 'RU', dialCode: '7', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg', digits: 10, continent: 'EU' },
      { name: 'San Marino', code: 'SM', dialCode: '378', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg', digits: 10, continent: 'EU' },
      { name: 'Serbia', code: 'RS', dialCode: '381', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg', digits: 9, continent: 'EU' },
      { name: 'Slovakia', code: 'SK', dialCode: '421', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg', digits: 9, continent: 'EU' },
      { name: 'Slovenia', code: 'SI', dialCode: '386', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg', digits: 8, continent: 'EU' },
      { name: 'Spain', code: 'ES', dialCode: '34', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg', digits: 9, continent: 'EU' },
      { name: 'Sweden', code: 'SE', dialCode: '46', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg', digits: 9, continent: 'EU' },
      { name: 'Switzerland', code: 'CH', dialCode: '41', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg', digits: 9, continent: 'EU' },
      { name: 'Turkey', code: 'TR', dialCode: '90', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg', digits: 10, continent: 'EU' },
      { name: 'Ukraine', code: 'UA', dialCode: '380', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg', digits: 9, continent: 'EU' },
      { name: 'United Kingdom', code: 'GB', dialCode: '44', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg', digits: 10, continent: 'EU' },
      { name: 'Vatican City', code: 'VA', dialCode: '379', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg', digits: 10, continent: 'EU' },

      // Asia
      { name: 'Afghanistan', code: 'AF', dialCode: '93', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg', digits: 9, continent: 'AS' },
      { name: 'Bahrain', code: 'BH', dialCode: '973', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg', digits: 8, continent: 'AS' },
      { name: 'Bangladesh', code: 'BD', dialCode: '880', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg', digits: 10, continent: 'AS' },
      { name: 'Bhutan', code: 'BT', dialCode: '975', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg', digits: 8, continent: 'AS' },
      { name: 'Brunei', code: 'BN', dialCode: '673', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg', digits: 7, continent: 'AS' },
      { name: 'Cambodia', code: 'KH', dialCode: '855', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg', digits: 9, continent: 'AS' },
      { name: 'China', code: 'CN', dialCode: '86', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg', digits: 11, continent: 'AS' },
      { name: 'India', code: 'IN', dialCode: '91', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg', digits: 10, continent: 'AS' },
      { name: 'Indonesia', code: 'ID', dialCode: '62', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg', digits: 11, continent: 'AS' },
      { name: 'Iran', code: 'IR', dialCode: '98', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg', digits: 10, continent: 'AS' },
      { name: 'Iraq', code: 'IQ', dialCode: '964', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg', digits: 10, continent: 'AS' },
      { name: 'Israel', code: 'IL', dialCode: '972', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg', digits: 9, continent: 'AS' },
      { name: 'Japan', code: 'JP', dialCode: '81', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg', digits: 11, continent: 'AS' },
      { name: 'Jordan', code: 'JO', dialCode: '962', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg', digits: 9, continent: 'AS' },
      { name: 'Kuwait', code: 'KW', dialCode: '965', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg', digits: 8, continent: 'AS' },
      { name: 'Kyrgyzstan', code: 'KG', dialCode: '996', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg', digits: 9, continent: 'AS' },
      { name: 'Laos', code: 'LA', dialCode: '856', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg', digits: 10, continent: 'AS' },
      { name: 'Lebanon', code: 'LB', dialCode: '961', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg', digits: 8, continent: 'AS' },
      { name: 'Malaysia', code: 'MY', dialCode: '60', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg', digits: 10, continent: 'AS' },
      { name: 'Maldives', code: 'MV', dialCode: '960', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg', digits: 7, continent: 'AS' },
      { name: 'Mongolia', code: 'MN', dialCode: '976', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg', digits: 8, continent: 'AS' },
      { name: 'Myanmar', code: 'MM', dialCode: '95', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg', digits: 9, continent: 'AS' },
      { name: 'Nepal', code: 'NP', dialCode: '977', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg', digits: 10, continent: 'AS' },
      { name: 'North Korea', code: 'KP', dialCode: '850', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg', digits: 9, continent: 'AS' },
      { name: 'Oman', code: 'OM', dialCode: '968', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg', digits: 8, continent: 'AS' },
      { name: 'Pakistan', code: 'PK', dialCode: '92', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg', digits: 10, continent: 'AS' },
      { name: 'Philippines', code: 'PH', dialCode: '63', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg', digits: 10, continent: 'AS' },
      { name: 'Qatar', code: 'QA', dialCode: '974', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg', digits: 8, continent: 'AS' },
      { name: 'Saudi Arabia', code: 'SA', dialCode: '966', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg', digits: 9, continent: 'AS' },
      { name: 'Singapore', code: 'SG', dialCode: '65', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg', digits: 8, continent: 'AS' },
      { name: 'South Korea', code: 'KR', dialCode: '82', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg', digits: 9, continent: 'AS' },
      { name: 'Sri Lanka', code: 'LK', dialCode: '94', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg', digits: 9, continent: 'AS' },
      { name: 'Syria', code: 'SY', dialCode: '963', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg', digits: 9, continent: 'AS' },
      { name: 'Taiwan', code: 'TW', dialCode: '886', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg', digits: 9, continent: 'AS' },
      { name: 'Tajikistan', code: 'TJ', dialCode: '992', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg', digits: 9, continent: 'AS' },
      { name: 'Thailand', code: 'TH', dialCode: '66', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg', digits: 9, continent: 'AS' },
      { name: 'Turkmenistan', code: 'TM', dialCode: '993', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg', digits: 8, continent: 'AS' },
      { name: 'United Arab Emirates', code: 'AE', dialCode: '971', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg', digits: 9, continent: 'AS' },
      { name: 'Uzbekistan', code: 'UZ', dialCode: '998', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg', digits: 9, continent: 'AS' },
      { name: 'Vietnam', code: 'VN', dialCode: '84', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg', digits: 9, continent: 'AS' },
      { name: 'Yemen', code: 'YE', dialCode: '967', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg', digits: 9, continent: 'AS' },

      // Africa
      { name: 'Algeria', code: 'DZ', dialCode: '213', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg', digits: 9, continent: 'AF' },
      { name: 'Angola', code: 'AO', dialCode: '244', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg', digits: 9, continent: 'AF' },
      { name: 'Benin', code: 'BJ', dialCode: '229', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg', digits: 8, continent: 'AF' },
      { name: 'Botswana', code: 'BW', dialCode: '267', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg', digits: 8, continent: 'AF' },
      { name: 'Burkina Faso', code: 'BF', dialCode: '226', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg', digits: 8, continent: 'AF' },
      { name: 'Burundi', code: 'BI', dialCode: '257', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg', digits: 8, continent: 'AF' },
      { name: 'Cameroon', code: 'CM', dialCode: '237', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg', digits: 9, continent: 'AF' },
      { name: 'Cape Verde', code: 'CV', dialCode: '238', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg', digits: 7, continent: 'AF' },
      { name: 'Central African Republic', code: 'CF', dialCode: '236', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg', digits: 8, continent: 'AF' },
      { name: 'Chad', code: 'TD', dialCode: '235', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg', digits: 8, continent: 'AF' },
      { name: 'Comoros', code: 'KM', dialCode: '269', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg', digits: 7, continent: 'AF' },
      { name: 'Congo', code: 'CG', dialCode: '242', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg', digits: 9, continent: 'AF' },
      { name: 'Congo (DRC)', code: 'CD', dialCode: '243', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg', digits: 9, continent: 'AF' },
      { name: 'Côte d\'Ivoire', code: 'CI', dialCode: '225', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg', digits: 10, continent: 'AF' },
      { name: 'Djibouti', code: 'DJ', dialCode: '253', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg', digits: 8, continent: 'AF' },
      { name: 'Egypt', code: 'EG', dialCode: '20', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg', digits: 10, continent: 'AF' },
      { name: 'Equatorial Guinea', code: 'GQ', dialCode: '240', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg', digits: 9, continent: 'AF' },
      { name: 'Eritrea', code: 'ER', dialCode: '291', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg', digits: 7, continent: 'AF' },
      { name: 'Eswatini', code: 'SZ', dialCode: '268', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg', digits: 8, continent: 'AF' },
      { name: 'Ethiopia', code: 'ET', dialCode: '251', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg', digits: 9, continent: 'AF' },
      { name: 'Gabon', code: 'GA', dialCode: '241', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg', digits: 8, continent: 'AF' },
      { name: 'Gambia', code: 'GM', dialCode: '220', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg', digits: 7, continent: 'AF' },
      { name: 'Ghana', code: 'GH', dialCode: '233', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg', digits: 9, continent: 'AF' },
      { name: 'Guinea', code: 'GN', dialCode: '224', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg', digits: 9, continent: 'AF' },
      { name: 'Guinea-Bissau', code: 'GW', dialCode: '245', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg', digits: 7, continent: 'AF' },
      { name: 'Kenya', code: 'KE', dialCode: '254', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg', digits: 9, continent: 'AF' },
      { name: 'Lesotho', code: 'LS', dialCode: '266', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg', digits: 8, continent: 'AF' },
      { name: 'Liberia', code: 'LR', dialCode: '231', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg', digits: 8, continent: 'AF' },
      { name: 'Libya', code: 'LY', dialCode: '218', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg', digits: 9, continent: 'AF' },
      { name: 'Madagascar', code: 'MG', dialCode: '261', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg', digits: 9, continent: 'AF' },
      { name: 'Malawi', code: 'MW', dialCode: '265', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg', digits: 9, continent: 'AF' },
      { name: 'Mali', code: 'ML', dialCode: '223', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg', digits: 8, continent: 'AF' },
      { name: 'Mauritania', code: 'MR', dialCode: '222', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg', digits: 8, continent: 'AF' },
      { name: 'Mauritius', code: 'MU', dialCode: '230', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg', digits: 8, continent: 'AF' },
      { name: 'Morocco', code: 'MA', dialCode: '212', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg', digits: 9, continent: 'AF' },
      { name: 'Mozambique', code: 'MZ', dialCode: '258', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg', digits: 9, continent: 'AF' },
      { name: 'Namibia', code: 'NA', dialCode: '264', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg', digits: 9, continent: 'AF' },
      { name: 'Niger', code: 'NE', dialCode: '227', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg', digits: 8, continent: 'AF' },
      { name: 'Nigeria', code: 'NG', dialCode: '234', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg', digits: 10, continent: 'AF' },
      { name: 'Rwanda', code: 'RW', dialCode: '250', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg', digits: 9, continent: 'AF' },
      { name: 'Senegal', code: 'SN', dialCode: '221', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg', digits: 9, continent: 'AF' },
      { name: 'Seychelles', code: 'SC', dialCode: '248', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg', digits: 7, continent: 'AF' },
      { name: 'Sierra Leone', code: 'SL', dialCode: '232', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg', digits: 8, continent: 'AF' },
      { name: 'Somalia', code: 'SO', dialCode: '252', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg', digits: 8, continent: 'AF' },
      { name: 'South Africa', code: 'ZA', dialCode: '27', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg', digits: 9, continent: 'AF' },
      { name: 'South Sudan', code: 'SS', dialCode: '211', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg', digits: 9, continent: 'AF' },
      { name: 'Sudan', code: 'SD', dialCode: '249', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg', digits: 9, continent: 'AF' },
      { name: 'Tanzania', code: 'TZ', dialCode: '255', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg', digits: 9, continent: 'AF' },
      { name: 'Togo', code: 'TG', dialCode: '228', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg', digits: 8, continent: 'AF' },
      { name: 'Tunisia', code: 'TN', dialCode: '216', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg', digits: 8, continent: 'AF' },
      { name: 'Uganda', code: 'UG', dialCode: '256', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg', digits: 9, continent: 'AF' },
      { name: 'Zambia', code: 'ZM', dialCode: '260', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg', digits: 9, continent: 'AF' },
      { name: 'Zimbabwe', code: 'ZW', dialCode: '263', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg', digits: 9, continent: 'AF' },

      // North America
      { name: 'Canada', code: 'CA', dialCode: '1', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg', digits: 10, continent: 'NA' },
      { name: 'Costa Rica', code: 'CR', dialCode: '506', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg', digits: 8, continent: 'NA' },
      { name: 'Cuba', code: 'CU', dialCode: '53', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg', digits: 8, continent: 'NA' },
      { name: 'Dominican Republic', code: 'DO', dialCode: '1', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg', digits: 10, continent: 'NA' },
      { name: 'El Salvador', code: 'SV', dialCode: '503', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg', digits: 8, continent: 'NA' },
      { name: 'Guatemala', code: 'GT', dialCode: '502', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg', digits: 8, continent: 'NA' },
      { name: 'Haiti', code: 'HT', dialCode: '509', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg', digits: 8, continent: 'NA' },
      { name: 'Honduras', code: 'HN', dialCode: '504', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg', digits: 8, continent: 'NA' },
      { name: 'Jamaica', code: 'JM', dialCode: '1', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg', digits: 10, continent: 'NA' },
      { name: 'Mexico', code: 'MX', dialCode: '52', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg', digits: 10, continent: 'NA' },
      { name: 'Nicaragua', code: 'NI', dialCode: '505', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg', digits: 8, continent: 'NA' },
      { name: 'Panama', code: 'PA', dialCode: '507', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg', digits: 8, continent: 'NA' },
      { name: 'Trinidad and Tobago', code: 'TT', dialCode: '1', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg', digits: 10, continent: 'NA' },
      { name: 'United States', code: 'US', dialCode: '1', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg', digits: 10, continent: 'NA' },
      { name: 'Belize', code: 'BZ', dialCode: '501', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg', digits: 7, continent: 'NA' },

      // South America
      { name: 'Argentina', code: 'AR', dialCode: '54', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg', digits: 10, continent: 'SA' },
      { name: 'Bolivia', code: 'BO', dialCode: '591', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg', digits: 8, continent: 'SA' },
      { name: 'Brazil', code: 'BR', dialCode: '55', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg', digits: 11, continent: 'SA' },
      { name: 'Chile', code: 'CL', dialCode: '56', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg', digits: 9, continent: 'SA' },
      { name: 'Colombia', code: 'CO', dialCode: '57', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg', digits: 10, continent: 'SA' },
      { name: 'Ecuador', code: 'EC', dialCode: '593', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg', digits: 9, continent: 'SA' },
      { name: 'Guyana', code: 'GY', dialCode: '592', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg', digits: 7, continent: 'SA' },
      { name: 'Paraguay', code: 'PY', dialCode: '595', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg', digits: 9, continent: 'SA' },
      { name: 'Peru', code: 'PE', dialCode: '51', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg', digits: 9, continent: 'SA' },
      { name: 'Suriname', code: 'SR', dialCode: '597', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg', digits: 7, continent: 'SA' },
      { name: 'Uruguay', code: 'UY', dialCode: '598', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg', digits: 8, continent: 'SA' },
      { name: 'Venezuela', code: 'VE', dialCode: '58', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg', digits: 10, continent: 'SA' },

      // Oceania
      { name: 'Australia', code: 'AU', dialCode: '61', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg', digits: 9, continent: 'OC' },
      { name: 'Fiji', code: 'FJ', dialCode: '679', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg', digits: 7, continent: 'OC' },
      { name: 'New Zealand', code: 'NZ', dialCode: '64', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg', digits: 9, continent: 'OC' },
      { name: 'Papua New Guinea', code: 'PG', dialCode: '675', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg', digits: 8, continent: 'OC' }
    ]);

    // Default country from props or Austria
    const defaultCountryCode = computed(() => props.content.defaultCountry || 'AT');
    
    // Selected country state
    const selectedCountry = ref(null);
    
    // Initialize selected country
    watch(() => defaultCountryCode.value, (newCode) => {
      const country = countries.value.find(c => c.code === newCode);
      if (country) {
        selectedCountry.value = country;
        updateAllVariables(country);
      } else {
        // Default to Austria if country not found
        const defaultCountry = countries.value.find(c => c.code === 'AT') || countries.value[0];
        selectedCountry.value = defaultCountry;
        updateAllVariables(defaultCountry);
      }
    }, { immediate: true });

    // Filter countries by continent first, then by search
    const filteredCountries = computed(() => {
      const continentFilter = props.content?.continentFilter || 'ALL';
      
      // First filter by continent
      let countriesByContinent = countries.value;
      if (continentFilter !== 'ALL') {
        countriesByContinent = countries.value.filter(country => country.continent === continentFilter);
      }
      
      // Then filter by search query
      if (!searchQuery.value) {
        return countriesByContinent;
      }
      
      const query = searchQuery.value.toLowerCase();
      return countriesByContinent.filter(country => 
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dialCode.includes(query)
      );
    });

    // ✅ MODIFIÉ : Update all variables + gestion spéciale France pour fullPhoneNumber
    const updateAllVariables = (country, phoneNumberOnly = '') => {
      if (!country) return;
      
      setCountryValue(country.code);
      setDialCodeValue(country.dialCode);
      setContinentValue(country.continent);
      
      if (phoneNumberOnly) {
        setPhoneNumberValue(phoneNumberOnly);
        
        // ✅ NOUVEAU : Gestion spéciale pour la France
        if (country.code === 'FR' && phoneNumberOnly.startsWith('0')) {
          // Pour fullPhoneNumber : format international standard (sans le 0)
          const internationalNumber = phoneNumberOnly.substring(1); // Enlever le 0
          setFullPhoneNumberValue(`+${country.dialCode} ${internationalNumber}`);
        } else {
          // Pour les autres pays ou si pas de 0 en France
          setFullPhoneNumberValue(`+${country.dialCode} ${phoneNumberOnly}`);
        }
      } else {
        const currentPhoneNumber = phoneValue.value || '';
        const numericPart = currentPhoneNumber.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
        setPhoneNumberValue(numericPart);
        
        // ✅ NOUVEAU : Gestion spéciale pour la France
        if (country.code === 'FR' && numericPart.startsWith('0')) {
          // Pour fullPhoneNumber : format international standard (sans le 0)
          const internationalNumber = numericPart.substring(1); // Enlever le 0
          setFullPhoneNumberValue(internationalNumber ? `+${country.dialCode} ${internationalNumber}` : `+${country.dialCode}`);
        } else {
          // Pour les autres pays ou si pas de 0 en France
          setFullPhoneNumberValue(numericPart ? `+${country.dialCode} ${numericPart}` : `+${country.dialCode}`);
        }
      }
    };

    // Focus handlers
    const handleFocus = () => {
      isFocused.value = true;
    };

    const handleBlur = () => {
      isFocused.value = false;
    };

    // ✅ MODIFIÉ : Toggle dropdown avec focus conditionnel selon showSearchBar
    const toggleDropdown = () => {
      if (isEditing.value) return;
      isDropdownOpen.value = !isDropdownOpen.value;
      if (isDropdownOpen.value) {
        searchQuery.value = '';
        document.addEventListener('click', closeDropdownOnClickOutside);
        // ✅ CONDITIONNEL : Focus seulement si la searchbar est affichée
        setTimeout(() => {
          if (searchInput.value && props.content.showSearchBar !== false) {
            searchInput.value.focus();
          }
        }, 100);
      } else {
        document.removeEventListener('click', closeDropdownOnClickOutside);
      }
    };

    // Close dropdown when clicking outside
    const closeDropdownOnClickOutside = (event) => {
      const dropdown = document.querySelector('.country-code-selector');
      if (dropdown && !dropdown.contains(event.target)) {
        isDropdownOpen.value = false;
        searchQuery.value = '';
        document.removeEventListener('click', closeDropdownOnClickOutside);
      }
    };

    // Select country
    const selectCountry = (country) => {
      if (isEditing.value) return;
      
      selectedCountry.value = country;
      isDropdownOpen.value = false;
      searchQuery.value = '';
      
      const phoneNumber = phoneValue.value || '';
      let numericPart = phoneNumber.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
      
      if (country.code === 'FR' && numericPart.length === 10 && numericPart.startsWith('0')) {
        // Keep 0 for France
      } else if (country.code === 'FR' && numericPart.startsWith('0') && numericPart.length > 1) {
        numericPart = numericPart.substring(1);
      }
      
      if (country.code === 'FR') {
        if (numericPart.startsWith('0')) {
          numericPart = numericPart.substring(0, 10);
        } else {
          numericPart = numericPart.substring(0, 9);
        }
      } else {
        numericPart = numericPart.substring(0, country.digits);
      }
      
      let newValue;
      if (numericPart) {
        newValue = `+${country.dialCode} ${numericPart}`;
      } else {
        newValue = `+${country.dialCode}`;
      }
      
      setPhoneValue(newValue);
      updateAllVariables(country, numericPart);
      
      if (phoneInput.value) {
        phoneInput.value.focus();
      }
      
      emit('trigger-event', {
        name: 'change',
        event: { 
          value: newValue,
          country: country.code,
          dialCode: country.dialCode,
          phoneNumber: numericPart,
          fullPhoneNumber: newValue,
          continent: country.continent
        }
      });
    };

    // Key press handler
    const onKeyPress = (event) => {
      if (isEditing.value) return;
      
      const allowedControlKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'PageUp', 'PageDown'
      ];
      
      if (allowedControlKeys.includes(event.key)) {
        return;
      }
      
      const isDigit = /^[0-9]$/.test(event.key);
      const isSpace = event.key === ' ';
      const currentValue = event.target.value;
      const countryCodePrefix = `+${selectedCountry.value?.dialCode}`;
      const isSpaceAfterCountryCode = isSpace && currentValue === countryCodePrefix;
      
      if (isDigit && selectedCountry.value) {
        const currentDigits = currentValue.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
        
        if (selectedCountry.value.code === 'FR') {
          if (currentDigits.startsWith('0') && currentDigits.length >= 10) {
            event.preventDefault();
            return;
          } else if (!currentDigits.startsWith('0') && currentDigits.length >= 9) {
            event.preventDefault();
            return;
          }
        } else {
          if (currentDigits.length >= selectedCountry.value.digits) {
            event.preventDefault();
            return;
          }
        }
      }
      
      if (!isDigit && !isSpaceAfterCountryCode) {
        event.preventDefault();
        return;
      }
    };

    // Paste handler
    const onPaste = (event) => {
      if (isEditing.value) return;
      
      event.preventDefault();
      
      const pastedText = (event.clipboardData || window.clipboardData).getData('text');
      let digitsOnly = pastedText.replace(/\D/g, '');
      
      if (digitsOnly && selectedCountry.value) {
        if (selectedCountry.value.code === 'FR') {
          if (digitsOnly.startsWith('0')) {
            digitsOnly = digitsOnly.substring(0, 10);
          } else {
            digitsOnly = digitsOnly.substring(0, 9);
          }
        } else {
          digitsOnly = digitsOnly.substring(0, selectedCountry.value.digits);
        }
        
        const countryCodePrefix = `+${selectedCountry.value.dialCode}`;
        const newValue = `${countryCodePrefix} ${digitsOnly}`;
        
        setPhoneValue(newValue);
        updateAllVariables(selectedCountry.value, digitsOnly);
        
        emit('trigger-event', {
          name: 'input',
          event: { 
            value: newValue,
            country: selectedCountry.value?.code,
            dialCode: selectedCountry.value?.dialCode,
            phoneNumber: digitsOnly,
            fullPhoneNumber: newValue,
            continent: selectedCountry.value?.continent
          }
        });
      }
    };

    // Input handler
    const onInput = (event) => {
      if (isEditing.value) return;
      
      let input = event.target.value;
      input = input.replace(/[^0-9+\s]/g, '');
      
      const countryCodePrefix = `+${selectedCountry.value?.dialCode}`;
      
      if (!input.startsWith(countryCodePrefix)) {
        let userNumbers = input.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
        
        if (selectedCountry.value) {
          if (selectedCountry.value.code === 'FR') {
            if (userNumbers.startsWith('0')) {
              userNumbers = userNumbers.substring(0, 10);
            } else {
              userNumbers = userNumbers.substring(0, 9);
            }
          } else {
            userNumbers = userNumbers.substring(0, selectedCountry.value.digits);
          }
        }
        
        if (userNumbers) {
          input = `${countryCodePrefix} ${userNumbers}`;
        } else {
          input = countryCodePrefix;
        }
      } else {
        const afterCountryCode = input.substring(countryCodePrefix.length).trim();
        let cleanNumbers = afterCountryCode.replace(/\D/g, '');
        
        if (selectedCountry.value) {
          if (selectedCountry.value.code === 'FR') {
            if (cleanNumbers.startsWith('0')) {
              cleanNumbers = cleanNumbers.substring(0, 10);
            } else {
              cleanNumbers = cleanNumbers.substring(0, 9);
            }
          } else {
            cleanNumbers = cleanNumbers.substring(0, selectedCountry.value.digits);
          }
        }
        
        if (cleanNumbers) {
          input = `${countryCodePrefix} ${cleanNumbers}`;
        } else {
          input = countryCodePrefix;
        }
      }
      
      setPhoneValue(input);
      
      const numericPart = input.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
      updateAllVariables(selectedCountry.value, numericPart);
      
      emit('trigger-event', {
        name: 'input',
        event: { 
          value: input,
          country: selectedCountry.value?.code,
          dialCode: selectedCountry.value?.dialCode,
          phoneNumber: numericPart,
          fullPhoneNumber: input,
          continent: selectedCountry.value?.continent
        }
      });
    };

    // Display value (formatted phone number)
    const displayValue = computed(() => {
      if (phoneValue.value && phoneValue.value.trim() !== '') {
        return phoneValue.value;
      }
      return selectedCountry.value ? `+${selectedCountry.value.dialCode}` : '';
    });

    // Styling computeds
    const containerStyle = computed(() => ({
      borderColor: props.content?.borderColor || '#ddd',
      borderWidth: props.content?.borderWidth || '1px',
      borderStyle: props.content?.borderStyle || 'solid',
      borderRadius: props.content?.borderRadius || '4px',
      backgroundColor: props.content?.backgroundColor || '#fff'
    }));

    const inputStyle = computed(() => ({
      color: props.content?.textColor || '#000',
      fontSize: props.content?.fontSize || '16px'
    }));

    const dropdownStyle = computed(() => ({
      minWidth: props.content?.dropdownWidth || '320px',
      maxHeight: props.content?.dropdownHeight || '320px',
      backgroundColor: props.content?.dropdownBackgroundColor || '#ffffff',
      borderColor: props.content?.dropdownBorderColor || '#ddd',
      borderWidth: props.content?.dropdownBorderWidth || '1px',
      borderStyle: props.content?.dropdownBorderStyle || 'solid',
      borderRadius: props.content?.dropdownBorderRadius || '4px'
    }));

    // ✅ NOUVEAU : Computed pour ajuster la hauteur selon la présence de la searchbar
    const countriesListStyleComputed = computed(() => {
      const dropdownHeight = props.content?.dropdownHeight || '320px';
      const searchBarHeight = props.content.showSearchBar !== false ? '60px' : '0px';
      const availableHeight = `calc(${dropdownHeight} - ${searchBarHeight})`;
      return {
        maxHeight: availableHeight
      };
    });

    const itemStyle = computed(() => ({
      borderColor: props.content?.itemBorderColor || 'transparent',
      borderWidth: props.content?.itemBorderWidth || '0px',
      borderStyle: props.content?.itemBorderStyle || 'solid',
      borderRadius: props.content?.itemBorderRadius || '0px'
    }));

    const labelStyle = computed(() => ({
      color: props.content?.labelColor || '#666',
      fontSize: props.content?.labelFontSize || '16px',
      fontWeight: props.content?.labelFontWeight || 'normal',
      backgroundColor: props.content?.labelBackgroundColor || 'white',
      padding: `0 ${props.content?.labelPadding || '4px'}`,
      '--active-color': props.content?.labelActiveColor || '#1976d2',
      '--active-font-size': props.content?.labelActiveFontSize || '12px'
    }));

    // ✅ NOUVEAU : Style pour la search bar customisable
    const searchInputStyle = computed(() => ({
      fontSize: props.content?.searchFontSize || '14px',
      color: props.content?.searchTextColor || '#000',
      backgroundColor: props.content?.searchBackgroundColor || '#ffffff',
      borderColor: props.content?.searchBorderColor || '#ddd',
      borderWidth: props.content?.searchBorderWidth || '1px',
      borderStyle: props.content?.searchBorderStyle || 'solid',
      borderRadius: props.content?.searchBorderRadius || '4px',
      padding: props.content?.searchPadding || '8px 12px',
      '--focus-border-color': props.content?.searchFocusBorderColor || '#1976d2',
      '--placeholder-color': props.content?.searchPlaceholderColor || '#999'
    }));

    const getItemVariables = (country) => {
      return {
        '--hover-bg-color': props.content?.itemHoverBackgroundColor || '#f5f5f5',
        '--hover-text-color': props.content?.itemHoverTextColor || '#000'
      };
    };

    // Clean up event listeners
    onBeforeUnmount(() => {
      document.removeEventListener('click', closeDropdownOnClickOutside);
    });

    // Watch for initialValue changes
    watch(() => props.content?.initialValue, (newValue) => {
      if (newValue !== undefined && newValue !== phoneValue.value) {
        setPhoneValue(newValue);
        
        try {
          const phoneNumber = parsePhoneNumberFromString(newValue);
          if (phoneNumber && phoneNumber.country) {
            const country = countries.value.find(c => c.code === phoneNumber.country);
            if (country) {
              selectedCountry.value = country;
              updateAllVariables(country);
            }
          }
        } catch (error) {
          console.error("Error parsing phone number:", error);
        }
      }
    });

    return {
      isDropdownOpen,
      isFocused,
      selectedCountry,
      countries,
      filteredCountries,
      phoneInput,
      searchInput,
      searchQuery,
      displayValue,
      phoneValue,
      containerStyle,
      inputStyle,
      dropdownStyle,
      countriesListStyleComputed,
      itemStyle,
      labelStyle,
      searchInputStyle, // ✅ NOUVEAU
      getItemVariables,
      toggleDropdown,
      selectCountry,
      onInput,
      onKeyPress,
      onPaste,
      handleFocus,
      handleBlur
    };
  }
};
</script>

<style lang="scss" scoped>
.country-code-selector {
  position: relative;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  .phone-input-container {
    position: relative;
    display: flex;
    height: 56px;
    transition: border-color 0.2s ease;
    
    &:focus-within {
      border-color: #1976d2;
      border-width: 2px;
      
      .input-label.active {
        color: var(--active-color) !important;
      }
    }
    
    .flag-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      border-right: 1px solid #eee;
      min-width: 70px;
      
      .selected-flag {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        
        .flag-img {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
        }
        
        .arrow-down {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #666;
          margin-left: 8px;
          transition: transform 0.2s ease;
          
          &.rotated {
            transform: rotate(180deg);
          }
        }
      }
      
      .country-dropdown {
        position: absolute;
        top: 100%;
        left: -1px;
        right: -1px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        overflow: hidden;
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        
        .search-container {
          padding: 12px;
          border-bottom: 1px solid #eee;
          background-color: #fafafa;
          flex-shrink: 0;
          
          .search-input {
            width: 100%;
            outline: none;
            transition: border-color 0.2s ease;
            
            &:focus {
              border-color: var(--focus-border-color) !important;
            }
            
            &::placeholder {
              color: var(--placeholder-color) !important;
            }
          }
        }
        
        .countries-list {
          overflow-y: auto;
          flex: 1;
          
          .country-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.15s ease;
            
            &:hover {
              background-color: var(--hover-bg-color) !important;
              color: var(--hover-text-color) !important;
            }
            
            &.selected {
              background-color: #e3f2fd;
              color: #1976d2;
            }
            
            .flag-img {
              width: 20px;
              height: 14px;
              object-fit: cover;
              border-radius: 2px;
              margin-right: 12px;
              flex-shrink: 0;
            }
            
            .country-name {
              flex: 1;
              font-size: 14px;
              text-align: left;
            }
          }
          
          .no-results {
            padding: 20px;
            text-align: center;
            color: #666;
            font-style: italic;
          }
        }
      }
    }
    
    .input-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      
      .phone-input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 20px 16px 8px 16px;
        font-size: 16px;
        background: transparent;
        
        &:focus {
          outline: none;
        }
        
        &::placeholder {
          color: transparent;
        }
      }
      
      .input-label {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        transition: all 0.2s ease;
        
        &.active {
          top: 8px;
          font-size: var(--active-font-size) !important;
          color: var(--active-color) !important;
          transform: translateY(0);
        }
      }
    }
  }
}

// Scrollbar styling
.countries-list::-webkit-scrollbar {
  width: 6px;
}

.countries-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.countries-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.countries-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
