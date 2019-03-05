// imports/startup/client/icons.js

// import api
import { Icons } from 'meteor/madl3ss:icons';

// import icons
import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

// configure package to add these icons to FA library
Icons.add({ brands, regular, solid });
