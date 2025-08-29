export default {
  editor: {
    label: {
      en: 'Country Code Selector',
      fr: 'Sélecteur de Code Pays'
    },
    icon: 'phone'
  },
  properties: {
    initialValue: {
      label: {
        en: 'Initial value',
        fr: 'Valeur initiale'
      },
      type: 'Text',
      bindable: true,
      section: 'settings',
      defaultValue: '+43',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing the phone number with country code: "+43 123456789"',
      },
      propertyHelp: {
        tooltip: 'The initial phone number value with country code',
      },
      /* wwEditor:end */
    },
    defaultCountry: {
      label: {
        en: 'Default country',
        fr: 'Pays par défaut'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'settings',
      defaultValue: 'AT',
      options: {
        options: [
          { value: 'AF', label: 'Afghanistan (+93)' },
          { value: 'AL', label: 'Albania (+355)' },
          { value: 'DZ', label: 'Algeria (+213)' },
          { value: 'AD', label: 'Andorra (+376)' },
          { value: 'AO', label: 'Angola (+244)' },
          { value: 'AR', label: 'Argentina (+54)' },
          { value: 'AM', label: 'Armenia (+374)' },
          { value: 'AU', label: 'Australia (+61)' },
          { value: 'AT', label: 'Austria (+43)' },
          { value: 'AZ', label: 'Azerbaijan (+994)' },
          { value: 'BH', label: 'Bahrain (+973)' },
          { value: 'BD', label: 'Bangladesh (+880)' },
          { value: 'BY', label: 'Belarus (+375)' },
          { value: 'BE', label: 'Belgium (+32)' },
          { value: 'BZ', label: 'Belize (+501)' },
          { value: 'BJ', label: 'Benin (+229)' },
          { value: 'BT', label: 'Bhutan (+975)' },
          { value: 'BO', label: 'Bolivia (+591)' },
          { value: 'BA', label: 'Bosnia and Herzegovina (+387)' },
          { value: 'BW', label: 'Botswana (+267)' },
          { value: 'BR', label: 'Brazil (+55)' },
          { value: 'BN', label: 'Brunei (+673)' },
          { value: 'BG', label: 'Bulgaria (+359)' },
          { value: 'BF', label: 'Burkina Faso (+226)' },
          { value: 'BI', label: 'Burundi (+257)' },
          { value: 'KH', label: 'Cambodia (+855)' },
          { value: 'CM', label: 'Cameroon (+237)' },
          { value: 'CA', label: 'Canada (+1)' },
          { value: 'CV', label: 'Cape Verde (+238)' },
          { value: 'CF', label: 'Central African Republic (+236)' },
          { value: 'TD', label: 'Chad (+235)' },
          { value: 'CL', label: 'Chile (+56)' },
          { value: 'CN', label: 'China (+86)' },
          { value: 'CO', label: 'Colombia (+57)' },
          { value: 'KM', label: 'Comoros (+269)' },
          { value: 'CG', label: 'Congo (+242)' },
          { value: 'CD', label: 'Congo (DRC) (+243)' },
          { value: 'CR', label: 'Costa Rica (+506)' },
          { value: 'CI', label: 'Côte d\'Ivoire (+225)' },
          { value: 'HR', label: 'Croatia (+385)' },
          { value: 'CU', label: 'Cuba (+53)' },
          { value: 'CY', label: 'Cyprus (+357)' },
          { value: 'CZ', label: 'Czech Republic (+420)' },
          { value: 'DK', label: 'Denmark (+45)' },
          { value: 'DJ', label: 'Djibouti (+253)' },
          { value: 'DO', label: 'Dominican Republic (+1)' },
          { value: 'EC', label: 'Ecuador (+593)' },
          { value: 'EG', label: 'Egypt (+20)' },
          { value: 'SV', label: 'El Salvador (+503)' },
          { value: 'GQ', label: 'Equatorial Guinea (+240)' },
          { value: 'ER', label: 'Eritrea (+291)' },
          { value: 'EE', label: 'Estonia (+372)' },
          { value: 'SZ', label: 'Eswatini (+268)' },
          { value: 'ET', label: 'Ethiopia (+251)' },
          { value: 'FJ', label: 'Fiji (+679)' },
          { value: 'FI', label: 'Finland (+358)' },
          { value: 'FR', label: 'France (+33)' },
          { value: 'GA', label: 'Gabon (+241)' },
          { value: 'GM', label: 'Gambia (+220)' },
          { value: 'GE', label: 'Georgia (+995)' },
          { value: 'DE', label: 'Germany (+49)' },
          { value: 'GH', label: 'Ghana (+233)' },
          { value: 'GR', label: 'Greece (+30)' },
          { value: 'GT', label: 'Guatemala (+502)' },
          { value: 'GN', label: 'Guinea (+224)' },
          { value: 'GW', label: 'Guinea-Bissau (+245)' },
          { value: 'GY', label: 'Guyana (+592)' },
          { value: 'HT', label: 'Haiti (+509)' },
          { value: 'HN', label: 'Honduras (+504)' },
          { value: 'HU', label: 'Hungary (+36)' },
          { value: 'IS', label: 'Iceland (+354)' },
          { value: 'IN', label: 'India (+91)' },
          { value: 'ID', label: 'Indonesia (+62)' },
          { value: 'IR', label: 'Iran (+98)' },
          { value: 'IQ', label: 'Iraq (+964)' },
          { value: 'IE', label: 'Ireland (+353)' },
          { value: 'IL', label: 'Israel (+972)' },
          { value: 'IT', label: 'Italy (+39)' },
          { value: 'JM', label: 'Jamaica (+1)' },
          { value: 'JP', label: 'Japan (+81)' },
          { value: 'JO', label: 'Jordan (+962)' },
          { value: 'KZ', label: 'Kazakhstan (+7)' },
          { value: 'KE', label: 'Kenya (+254)' },
          { value: 'KW', label: 'Kuwait (+965)' },
          { value: 'KG', label: 'Kyrgyzstan (+996)' },
          { value: 'LA', label: 'Laos (+856)' },
          { value: 'LV', label: 'Latvia (+371)' },
          { value: 'LB', label: 'Lebanon (+961)' },
          { value: 'LS', label: 'Lesotho (+266)' },
          { value: 'LR', label: 'Liberia (+231)' },
          { value: 'LY', label: 'Libya (+218)' },
          { value: 'LI', label: 'Liechtenstein (+423)' },
          { value: 'LT', label: 'Lithuania (+370)' },
          { value: 'LU', label: 'Luxembourg (+352)' },
          { value: 'MG', label: 'Madagascar (+261)' },
          { value: 'MW', label: 'Malawi (+265)' },
          { value: 'MY', label: 'Malaysia (+60)' },
          { value: 'MV', label: 'Maldives (+960)' },
          { value: 'ML', label: 'Mali (+223)' },
          { value: 'MT', label: 'Malta (+356)' },
          { value: 'MR', label: 'Mauritania (+222)' },
          { value: 'MU', label: 'Mauritius (+230)' },
          { value: 'MX', label: 'Mexico (+52)' },
          { value: 'MD', label: 'Moldova (+373)' },
          { value: 'MC', label: 'Monaco (+377)' },
          { value: 'MN', label: 'Mongolia (+976)' },
          { value: 'ME', label: 'Montenegro (+382)' },
          { value: 'MA', label: 'Morocco (+212)' },
          { value: 'MZ', label: 'Mozambique (+258)' },
          { value: 'MM', label: 'Myanmar (+95)' },
          { value: 'NA', label: 'Namibia (+264)' },
          { value: 'NP', label: 'Nepal (+977)' },
          { value: 'NL', label: 'Netherlands (+31)' },
          { value: 'NZ', label: 'New Zealand (+64)' },
          { value: 'NI', label: 'Nicaragua (+505)' },
          { value: 'NE', label: 'Niger (+227)' },
          { value: 'NG', label: 'Nigeria (+234)' },
          { value: 'KP', label: 'North Korea (+850)' },
          { value: 'MK', label: 'North Macedonia (+389)' },
          { value: 'NO', label: 'Norway (+47)' },
          { value: 'OM', label: 'Oman (+968)' },
          { value: 'PK', label: 'Pakistan (+92)' },
          { value: 'PA', label: 'Panama (+507)' },
          { value: 'PG', label: 'Papua New Guinea (+675)' },
          { value: 'PY', label: 'Paraguay (+595)' },
          { value: 'PE', label: 'Peru (+51)' },
          { value: 'PH', label: 'Philippines (+63)' },
          { value: 'PL', label: 'Poland (+48)' },
          { value: 'PT', label: 'Portugal (+351)' },
          { value: 'QA', label: 'Qatar (+974)' },
          { value: 'RO', label: 'Romania (+40)' },
          { value: 'RU', label: 'Russia (+7)' },
          { value: 'RW', label: 'Rwanda (+250)' },
          { value: 'SM', label: 'San Marino (+378)' },
          { value: 'SA', label: 'Saudi Arabia (+966)' },
          { value: 'SN', label: 'Senegal (+221)' },
          { value: 'RS', label: 'Serbia (+381)' },
          { value: 'SC', label: 'Seychelles (+248)' },
          { value: 'SL', label: 'Sierra Leone (+232)' },
          { value: 'SG', label: 'Singapore (+65)' },
          { value: 'SK', label: 'Slovakia (+421)' },
          { value: 'SI', label: 'Slovenia (+386)' },
          { value: 'SO', label: 'Somalia (+252)' },
          { value: 'ZA', label: 'South Africa (+27)' },
          { value: 'KR', label: 'South Korea (+82)' },
          { value: 'SS', label: 'South Sudan (+211)' },
          { value: 'ES', label: 'Spain (+34)' },
          { value: 'LK', label: 'Sri Lanka (+94)' },
          { value: 'SD', label: 'Sudan (+249)' },
          { value: 'SR', label: 'Suriname (+597)' },
          { value: 'SE', label: 'Sweden (+46)' },
          { value: 'CH', label: 'Switzerland (+41)' },
          { value: 'SY', label: 'Syria (+963)' },
          { value: 'TW', label: 'Taiwan (+886)' },
          { value: 'TJ', label: 'Tajikistan (+992)' },
          { value: 'TZ', label: 'Tanzania (+255)' },
          { value: 'TH', label: 'Thailand (+66)' },
          { value: 'TG', label: 'Togo (+228)' },
          { value: 'TT', label: 'Trinidad and Tobago (+1)' },
          { value: 'TN', label: 'Tunisia (+216)' },
          { value: 'TR', label: 'Turkey (+90)' },
          { value: 'TM', label: 'Turkmenistan (+993)' },
          { value: 'UG', label: 'Uganda (+256)' },
          { value: 'UA', label: 'Ukraine (+380)' },
          { value: 'AE', label: 'United Arab Emirates (+971)' },
          { value: 'GB', label: 'United Kingdom (+44)' },
          { value: 'US', label: 'United States (+1)' },
          { value: 'UY', label: 'Uruguay (+598)' },
          { value: 'UZ', label: 'Uzbekistan (+998)' },
          { value: 'VA', label: 'Vatican City (+379)' },
          { value: 'VE', label: 'Venezuela (+58)' },
          { value: 'VN', label: 'Vietnam (+84)' },
          { value: 'YE', label: 'Yemen (+967)' },
          { value: 'ZM', label: 'Zambia (+260)' },
          { value: 'ZW', label: 'Zimbabwe (+263)' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing the country code: "AT", "FR", "US", etc.',
      },
      propertyHelp: {
        tooltip: 'The default country to show when the component loads',
      },
      /* wwEditor:end */
    },
    continentFilter: {
      label: {
        en: 'Continent filter',
        fr: 'Filtre par continent'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'settings',
      defaultValue: 'ALL',
      options: {
        options: [
          { value: 'ALL', label: 'All continents / Tous les continents' },
          { value: 'EU', label: 'Europe' },
          { value: 'AS', label: 'Asia / Asie' },
          { value: 'AF', label: 'Africa / Afrique' },
          { value: 'NA', label: 'North America / Amérique du Nord' },
          { value: 'SA', label: 'South America / Amérique du Sud' },
          { value: 'OC', label: 'Oceania / Océanie' },
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing the continent filter: "ALL", "EU", "AS", etc.',
      },
      propertyHelp: {
        tooltip: 'Filter countries by continent. Use "ALL" to show all countries.',
      },
      /* wwEditor:end */
    },
    placeholder: {
      label: {
        en: 'Placeholder',
        fr: 'Placeholder'
      },
      type: 'Text',
      bindable: true,
      section: 'settings',
      defaultValue: 'Phone number',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string for the input placeholder: "Enter your phone number"',
      },
      propertyHelp: {
        tooltip: 'Placeholder text shown when the input is empty',
      },
      /* wwEditor:end */
    },
    label: {
      label: {
        en: 'Label text',
        fr: 'Texte du libellé'
      },
      type: 'Text',
      bindable: true,
      section: 'settings',
      defaultValue: 'Phone number*',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string for the input label: "Phone number"',
      },
      propertyHelp: {
        tooltip: 'Label text displayed as floating label',
      },
      /* wwEditor:end */
    },
    // ===== NOUVEAU TOGGLE SEARCHBAR =====
    showSearchBar: {
      label: {
        en: 'Show search bar',
        fr: 'Afficher la barre de recherche'
      },
      type: 'OnOff',
      bindable: true,
      section: 'settings',
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to show or hide the search bar: true or false',
      },
      propertyHelp: {
        tooltip: 'Toggle to show or hide the search bar in the dropdown',
      },
      /* wwEditor:end */
    },
    
    // ===== STYLE GÉNÉRAL =====
    borderColor: {
      label: {
        en: 'Border color',
        fr: 'Couleur de bordure'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#ddd',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#FF0000", "rgb(255, 0, 0)", etc.',
      },
      propertyHelp: {
        tooltip: 'The color of the input border',
      },
      /* wwEditor:end */
    },
    // ===== SEARCH BAR CUSTOMIZATION =====
searchPlaceholder: {
  label: {
    en: 'Search placeholder',
    fr: 'Placeholder de recherche'
  },
  type: 'Text',
  bindable: true,
  section: 'settings',
  defaultValue: 'Search countries...',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string for the search input placeholder: "Search countries..."',
  },
  propertyHelp: {
    tooltip: 'Placeholder text for the search input',
  },
  /* wwEditor:end */
},
searchFontSize: {
  label: {
    en: 'Search font size',
    fr: 'Taille police recherche'
  },
  type: 'Length',
  bindable: true,
  section: 'style',
  defaultValue: '14px',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a CSS length: "14px", "1rem", etc.',
  },
  propertyHelp: {
    tooltip: 'The font size of the search input',
  },
  /* wwEditor:end */
},
searchTextColor: {
  label: {
    en: 'Search text color',
    fr: 'Couleur texte recherche'
  },
  type: 'Color',
  bindable: true,
  section: 'style',
  defaultValue: '#000',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a color: "#000000", "rgb(0, 0, 0)", etc.',
  },
  propertyHelp: {
    tooltip: 'The text color of the search input',
  },
  /* wwEditor:end */
},
searchPlaceholderColor: {
  label: {
    en: 'Search placeholder color',
    fr: 'Couleur placeholder recherche'
  },
  type: 'Color',
  bindable: true,
  section: 'style',
  defaultValue: '#999',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a color: "#999999", "rgb(153, 153, 153)", etc.',
  },
  propertyHelp: {
    tooltip: 'The placeholder color of the search input',
  },
  /* wwEditor:end */
},
searchBackgroundColor: {
  label: {
    en: 'Search background',
    fr: 'Arrière-plan recherche'
  },
  type: 'Color',
  bindable: true,
  section: 'style',
  defaultValue: '#ffffff',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a color: "#FFFFFF", "rgb(255, 255, 255)", etc.',
  },
  propertyHelp: {
    tooltip: 'The background color of the search input',
  },
  /* wwEditor:end */
},
searchBorderColor: {
  label: {
    en: 'Search border color',
    fr: 'Couleur bordure recherche'
  },
  type: 'Color',
  bindable: true,
  section: 'style',
  defaultValue: '#ddd',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a color: "#DDDDDD", "rgb(221, 221, 221)", etc.',
  },
  propertyHelp: {
    tooltip: 'The border color of the search input',
  },
  /* wwEditor:end */
},
searchBorderWidth: {
  label: {
    en: 'Search border width',
    fr: 'Épaisseur bordure recherche'
  },
  type: 'Length',
  bindable: true,
  section: 'style',
  defaultValue: '1px',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a CSS length: "1px", "2px", etc.',
  },
  propertyHelp: {
    tooltip: 'The border width of the search input',
  },
  /* wwEditor:end */
},
searchBorderStyle: {
  label: {
    en: 'Search border style',
    fr: 'Style bordure recherche'
  },
  type: 'TextSelect',
  bindable: true,
  section: 'style',
  defaultValue: 'solid',
  options: {
    options: [
      { value: 'solid', label: 'Solid' },
      { value: 'dashed', label: 'Dashed' },
      { value: 'dotted', label: 'Dotted' },
      { value: 'double', label: 'Double' },
      { value: 'groove', label: 'Groove' },
      { value: 'ridge', label: 'Ridge' },
      { value: 'inset', label: 'Inset' },
      { value: 'outset', label: 'Outset' }
    ]
  },
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a CSS border style: "solid", "dashed", etc.',
  },
  propertyHelp: {
    tooltip: 'The border style of the search input',
  },
  /* wwEditor:end */
},
searchBorderRadius: {
  label: {
    en: 'Search border radius',
    fr: 'Rayon bordure recherche'
  },
  type: 'Length',
  bindable: true,
  section: 'style',
  defaultValue: '4px',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a CSS length: "4px", "8px", etc.',
  },
  propertyHelp: {
    tooltip: 'The border radius of the search input',
  },
  /* wwEditor:end */
},
searchPadding: {
  label: {
    en: 'Search padding',
    fr: 'Padding recherche'
  },
  type: 'Length',
  bindable: true,
  section: 'style',
  defaultValue: '8px 12px',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing CSS padding: "8px 12px", "10px", etc.',
  },
  propertyHelp: {
    tooltip: 'The padding of the search input',
  },
  /* wwEditor:end */
},
searchFocusBorderColor: {
  label: {
    en: 'Search focus border color',
    fr: 'Couleur bordure recherche focus'
  },
  type: 'Color',
  bindable: true,
  section: 'style',
  defaultValue: '#1976d2',
  /* wwEditor:start */
  bindingValidation: {
    type: 'string',
    tooltip: 'A string representing a color: "#1976d2", "rgb(25, 118, 210)", etc.',
  },
  propertyHelp: {
    tooltip: 'The border color of the search input when focused',
  },
  /* wwEditor:end */
},

    borderWidth: {
      label: {
        en: 'Border width',
        fr: 'Épaisseur de bordure'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '1px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "1px", "2px", etc.',
      },
      propertyHelp: {
        tooltip: 'The width of the input border',
      },
      /* wwEditor:end */
    },
    borderStyle: {
      label: {
        en: 'Border style',
        fr: 'Style de bordure'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'style',
      defaultValue: 'solid',
      options: {
        options: [
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'double', label: 'Double' },
          { value: 'groove', label: 'Groove' },
          { value: 'ridge', label: 'Ridge' },
          { value: 'inset', label: 'Inset' },
          { value: 'outset', label: 'Outset' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS border style: "solid", "dashed", etc.',
      },
      propertyHelp: {
        tooltip: 'The style of the input border',
      },
      /* wwEditor:end */
    },
    borderRadius: {
      label: {
        en: 'Border radius',
        fr: 'Rayon de bordure'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '4px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "4px", "0.5rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The border radius of the input',
      },
      /* wwEditor:end */
    },
    backgroundColor: {
      label: {
        en: 'Background color',
        fr: 'Couleur de fond'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#fff',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#FFFFFF", "rgb(255, 255, 255)", etc.',
      },
      propertyHelp: {
        tooltip: 'The background color of the input',
      },
      /* wwEditor:end */
    },
    textColor: {
      label: {
        en: 'Text color',
        fr: 'Couleur du texte'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#000',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#000000", "rgb(0, 0, 0)", etc.',
      },
      propertyHelp: {
        tooltip: 'The color of the input text',
      },
      /* wwEditor:end */
    },
    fontSize: {
      label: {
        en: 'Font size',
        fr: 'Taille de police'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '16px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "16px", "1rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The font size of the input text',
      },
      /* wwEditor:end */
    },
    // ===== LABEL FLOATING STYLES =====
    labelColor: {
      label: {
        en: 'Label color',
        fr: 'Couleur du libellé'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#666',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#666666", "rgb(102, 102, 102)", etc.',
      },
      propertyHelp: {
        tooltip: 'The color of the floating label when inactive',
      },
      /* wwEditor:end */
    },
    labelActiveColor: {
      label: {
        en: 'Label active color',
        fr: 'Couleur libellé actif'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#1976d2',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#1976d2", "rgb(25, 118, 210)", etc.',
      },
      propertyHelp: {
        tooltip: 'The color of the floating label when active/focused',
      },
      /* wwEditor:end */
    },
    labelFontSize: {
      label: {
        en: 'Label font size',
        fr: 'Taille police libellé'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '16px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "16px", "1rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The font size of the floating label when inactive',
      },
      /* wwEditor:end */
    },
    labelActiveFontSize: {
      label: {
        en: 'Label active font size',
        fr: 'Taille police libellé actif'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '12px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "12px", "0.75rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The font size of the floating label when active/focused',
      },
      /* wwEditor:end */
    },
    labelBackgroundColor: {
      label: {
        en: 'Label background',
        fr: 'Arrière-plan libellé'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: 'white',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "white", "transparent", "#ffffff", etc.',
      },
      propertyHelp: {
        tooltip: 'The background color of the floating label',
      },
      /* wwEditor:end */
    },
    labelPadding: {
      label: {
        en: 'Label padding',
        fr: 'Padding du libellé'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '4px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "4px", "0.25rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The padding around the floating label text',
      },
      /* wwEditor:end */
    },
    labelFontWeight: {
      label: {
        en: 'Label font weight',
        fr: 'Graisse police libellé'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'style',
      defaultValue: 'normal',
      options: {
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: '100', label: '100 - Thin' },
          { value: '200', label: '200 - Extra Light' },
          { value: '300', label: '300 - Light' },
          { value: '400', label: '400 - Normal' },
          { value: '500', label: '500 - Medium' },
          { value: '600', label: '600 - Semi Bold' },
          { value: '700', label: '700 - Bold' },
          { value: '800', label: '800 - Extra Bold' },
          { value: '900', label: '900 - Black' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS font weight: "normal", "bold", "500", etc.',
      },
      propertyHelp: {
        tooltip: 'The font weight of the floating label',
      },
      /* wwEditor:end */
    },
    // ===== DROPDOWN STYLES =====
    dropdownWidth: {
      label: {
        en: 'Dropdown width',
        fr: 'Largeur du dropdown'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '320px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "320px", "100%", "20rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The width of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownHeight: {
      label: {
        en: 'Dropdown height',
        fr: 'Hauteur du dropdown'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '320px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "320px", "50vh", "20rem", etc.',
      },
      propertyHelp: {
        tooltip: 'The maximum height of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownBackgroundColor: {
      label: {
        en: 'Dropdown background',
        fr: 'Arrière-plan dropdown'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#ffffff',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#FFFFFF", "rgb(255, 255, 255)", etc.',
      },
      propertyHelp: {
        tooltip: 'The background color of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownBorderColor: {
      label: {
        en: 'Dropdown border color',
        fr: 'Couleur bordure dropdown'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#ddd',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#DDDDDD", "rgb(221, 221, 221)", etc.',
      },
      propertyHelp: {
        tooltip: 'The border color of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownBorderWidth: {
      label: {
        en: 'Dropdown border width',
        fr: 'Épaisseur bordure dropdown'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '1px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "1px", "2px", etc.',
      },
      propertyHelp: {
        tooltip: 'The border width of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownBorderStyle: {
      label: {
        en: 'Dropdown border style',
        fr: 'Style bordure dropdown'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'style',
      defaultValue: 'solid',
      options: {
        options: [
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'double', label: 'Double' },
          { value: 'groove', label: 'Groove' },
          { value: 'ridge', label: 'Ridge' },
          { value: 'inset', label: 'Inset' },
          { value: 'outset', label: 'Outset' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS border style: "solid", "dashed", etc.',
      },
      propertyHelp: {
        tooltip: 'The border style of the dropdown menu',
      },
      /* wwEditor:end */
    },
    dropdownBorderRadius: {
      label: {
        en: 'Dropdown border radius',
        fr: 'Rayon bordure dropdown'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '4px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "4px", "8px", etc.',
      },
      propertyHelp: {
        tooltip: 'The border radius of the dropdown menu',
      },
      /* wwEditor:end */
    },
    // ===== DROPDOWN ITEMS STYLES =====
    itemHoverBackgroundColor: {
      label: {
        en: 'Item hover background',
        fr: 'Arrière-plan survol item'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#f5f5f5',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#F5F5F5", "rgb(245, 245, 245)", etc.',
      },
      propertyHelp: {
        tooltip: 'The background color when hovering over dropdown items',
      },
      /* wwEditor:end */
    },
    itemHoverTextColor: {
      label: {
        en: 'Item hover text color',
        fr: 'Couleur texte survol item'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: '#000',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "#000000", "rgb(0, 0, 0)", etc.',
      },
      propertyHelp: {
        tooltip: 'The text color when hovering over dropdown items',
      },
      /* wwEditor:end */
    },
    itemBorderColor: {
      label: {
        en: 'Item border color',
        fr: 'Couleur bordure item'
      },
      type: 'Color',
      bindable: true,
      section: 'style',
      defaultValue: 'transparent',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a color: "transparent", "#EEEEEE", etc.',
      },
      propertyHelp: {
        tooltip: 'The border color of dropdown items',
      },
      /* wwEditor:end */
    },
    itemBorderWidth: {
      label: {
        en: 'Item border width',
        fr: 'Épaisseur bordure item'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '0px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "0px", "1px", etc.',
      },
      propertyHelp: {
        tooltip: 'The border width of dropdown items',
      },
      /* wwEditor:end */
    },
    itemBorderStyle: {
      label: {
        en: 'Item border style',
        fr: 'Style bordure item'
      },
      type: 'TextSelect',
      bindable: true,
      section: 'style',
      defaultValue: 'solid',
      options: {
        options: [
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'double', label: 'Double' },
          { value: 'groove', label: 'Groove' },
          { value: 'ridge', label: 'Ridge' },
          { value: 'inset', label: 'Inset' },
          { value: 'outset', label: 'Outset' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS border style: "solid", "dashed", etc.',
      },
      propertyHelp: {
        tooltip: 'The border style of dropdown items',
      },
      /* wwEditor:end */
    },
    itemBorderRadius: {
      label: {
        en: 'Item border radius',
        fr: 'Rayon bordure item'
      },
      type: 'Length',
      bindable: true,
      section: 'style',
      defaultValue: '0px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string representing a CSS length: "0px", "4px", etc.',
      },
      propertyHelp: {
        tooltip: 'The border radius of dropdown items',
      },
      /* wwEditor:end */
    }
  },
  triggerEvents: [
    {
      name: 'change',
      label: {
        en: 'On change',
        fr: 'Au changement'
      },
      event: {
        value: '',
        country: '',
        dialCode: '',
        phoneNumber: '',
        fullPhoneNumber: '',
        continent: ''
      },
      default: true
    },
    {
      name: 'input',
      label: {
        en: 'On input',
        fr: 'À la saisie'
      },
      event: {
        value: '',
        country: '',
        dialCode: '',
        phoneNumber: '',
        fullPhoneNumber: '',
        continent: ''
      }
    },
    {
      name: 'initValueChange',
      label: {
        en: 'On init value change',
        fr: 'Au changement de la valeur initiale'
      },
      event: {
        value: '',
        country: '',
        dialCode: '',
        phoneNumber: '',
        fullPhoneNumber: '',
        continent: ''
      }
    }
  ],
  actions: [
    {
      action: 'setValue',
      label: {
        en: 'Set value',
        fr: 'Définir la valeur'
      },
      args: [
        {
          name: 'value',
          type: 'string',
          label: {
            en: 'Phone number',
            fr: 'Numéro de téléphone'
          }
        }
      ]
    },
    {
      action: 'setCountry',
      label: {
        en: 'Set country',
        fr: 'Définir le pays'
      },
      args: [
        {
          name: 'countryCode',
          type: 'string',
          label: {
            en: 'Country code (AT, FR, US, etc.)',
            fr: 'Code pays (AT, FR, US, etc.)'
          }
        }
      ]
    }
  ],
  variables: [
    {
      name: 'value',
      label: {
        en: 'Input value',
        fr: 'Valeur de l\'input'
      },
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'country',
      label: {
        en: 'Country code',
        fr: 'Code pays'
      },
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'dialCode',
      label: {
        en: 'Dial code',
        fr: 'Indicatif téléphonique'
      },
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'phoneNumber',
      label: {
        en: 'Phone number only',
        fr: 'Numéro seulement'
      },
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'fullPhoneNumber',
      label: {
        en: 'Full phone number',
        fr: 'Numéro complet'
      },
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'continent',
      label: {
        en: 'Continent',
        fr: 'Continent'
      },
      type: 'string',
      defaultValue: ''
    }
  ]
};
