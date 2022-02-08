# TABLE OF CONTENTS
- [FOLDER STRUCTURE:](#folder-structure-)
- [SETUP:](#setup-)
- [OPERATION:](#operation-)
- [Postman](#postman)


# FOLDER STRUCTURE:

```bash
├───public
│   ├───login
│   │   ├───css
│   │   ├───fonts
│   │   │   ├───font-awesome-4.7.0
│   │   │   │   ├───css
│   │   │   │   ├───fonts
│   │   │   │   ├───less
│   │   │   │   └───scss
│   │   │   ├───montserrat
│   │   │   └───poppins
│   │   ├───images
│   │   │   └───icons
│   │   ├───js
│   │   └───vendor
│   │       ├───animate
│   │       ├───bootstrap
│   │       │   ├───css
│   │       │   └───js
│   │       ├───css-hamburgers
│   │       ├───jquery
│   │       ├───select2
│   │       └───tilt
│   └───monster-admin
│       ├───assets
│       │   ├───images
│       │   │   ├───background
│       │   │   ├───big
│       │   │   └───users
│       │   └───plugins
│       │       ├───bootstrap
│       │       │   └───dist
│       │       │       ├───css
│       │       │       └───js
│       │       ├───chartist
│       │       │   └───dist
│       │       ├───chartist-plugin-tooltips
│       │       │   └───dist
│       │       ├───flot
│       │       │   └───examples
│       │       │       ├───ajax
│       │       │       ├───annotating
│       │       │       ├───axes-interacting
│       │       │       ├───axes-multiple
│       │       │       ├───axes-time
│       │       │       ├───axes-time-zones
│       │       │       │   └───tz
│       │       │       ├───basic-options
│       │       │       ├───basic-usage
│       │       │       ├───canvas
│       │       │       ├───categories
│       │       │       ├───image
│       │       │       ├───interacting
│       │       │       ├───navigate
│       │       │       ├───percentiles
│       │       │       ├───realtime
│       │       │       ├───resize
│       │       │       ├───selection
│       │       │       ├───series-errorbars
│       │       │       ├───series-pie
│       │       │       ├───series-toggle
│       │       │       ├───series-types
│       │       │       ├───shared
│       │       │       │   └───jquery-ui
│       │       │       ├───stacking
│       │       │       ├───symbols
│       │       │       ├───threshold
│       │       │       ├───tracking
│       │       │       ├───visitors
│       │       │       └───zooming
│       │       ├───flot.tooltip
│       │       │   └───js
│       │       ├───gmaps
│       │       │   └───lib
│       │       ├───jquery
│       │       │   └───dist
│       │       ├───perfect-scrollbar
│       │       │   └───dist
│       │       │       ├───css
│       │       │       └───js
│       │       └───popper.js
│       │           └───dist
│       │               ├───esm
│       │               └───umd
│       ├───html
│       └───monster-html
│           ├───common
│           │   └───partials
│           ├───css
│           │   └───icons
│           │       ├───font-awesome
│           │       │   ├───css
│           │       │   ├───less
│           │       │   ├───scss
│           │       │   └───webfonts
│           │       ├───material-design-iconic-font
│           │       │   ├───css
│           │       │   └───fonts
│           │       ├───simple-line-icons
│           │       │   ├───css
│           │       │   ├───fonts
│           │       │   ├───less
│           │       │   └───scss
│           │       ├───themify-icons
│           │       │   ├───fonts
│           │       │   └───ie7
│           │       └───weather-icons
│           │           ├───css
│           │           ├───fonts
│           │           ├───less
│           │           │   ├───css
│           │           │   ├───icon-classes
│           │           │   ├───icon-variables
│           │           │   └───mappings
│           │           └───sass
│           │               ├───icon-classes
│           │               ├───icon-variables
│           │               └───mappings
│           ├───js
│           │   └───pages
│           │       └───dashboards
│           └───scss
│               ├───bootstrap
│               │   ├───forms
│               │   ├───helpers
│               │   ├───mixins
│               │   ├───utilities
│               │   └───vendor
│               ├───core
│               │   ├───animation
│               │   ├───breadcrumb
│               │   ├───buttons
│               │   ├───extra
│               │   ├───layout
│               │   ├───loader
│               │   ├───scafholdings
│               │   ├───sidebar
│               │   ├───topbar
│               │   └───wave-effects
│               ├───icons
│               │   ├───font-awesome
│               │   │   ├───css
│               │   │   ├───less
│               │   │   ├───scss
│               │   │   └───webfonts
│               │   ├───simple-line-icons
│               │   │   ├───css
│               │   │   ├───fonts
│               │   │   ├───less
│               │   │   └───scss
│               │   └───themify-icons
│               ├───mixins
│               ├───theme-colors
│               └───widgets
├───src
│   ├───auth
│   │   └───dto
│   │       └───validation
│   ├───base
│   ├───common
│   │   ├───config
│   │   │   └───logger
│   │   ├───dto
│   │   └───untils
│   ├───entity
│   ├───helper
│   ├───module
│   │   ├───auth
│   │   │   ├───dto
│   │   │   ├───guard
│   │   │   ├───strategy
│   │   │   └───untils
│   │   ├───user
│   │   │   └───dto
│   │   └───validator
│   │       └───ValidatorContrait
│   └───untils
└───test
```

# SETUP:
- Check file config.js in directory ```src/common/config/db.config.ts``` for database configuration
  * The following is important:
    + DB_NAME
    + DB_HOST
    + DB_USERNAME
    + DB_PASSWORD
    + DB_TYPE
    + DB_PORT
- Check db synchronize in  [here](https://github.com/longhe141142/simple-auth-nestjs/blob/main/src/common/config/db.config.ts)


# OPERATION:
```bash
  nest start #run the server in dev mode
```

# Postman
- Import POSTMAN from directory in src folder
  [here](https://github.com/longhe141142/simple-auth-nestjs/blob/main/UNO.postman_collection.json)
