import { AdminJSOptions } from 'adminjs';

import user from '../models/user.js';
import transactions from '../models/transactions.js';
import notification from '../models/notification.js';
import resetPassword from '../models/resetPassword.js';
import plan from '../models/plan.js';
import orders from '../models/orders.js';
import dmin from '../models/dmin.js';
import referral from '../models/referral.js';
import portfolio from '../models/portfolio.js';

import componentLoader from './component-loader.js';

const options = {
  componentLoader,
  rootPath: '/admin',
  resources: [user, transactions, notification, resetPassword, plan, referral, orders, dmin, portfolio],
  databases: [],
};

export default options;
