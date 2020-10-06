'use strict';

const APP_NAME = process.env.APP_NAME || 'Boundary';
const API_HOST = process.env.API_HOST || '';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'core',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: false,
      /*{
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }*/
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    api: {
      host: API_HOST,
      namespace: 'v1',
    },

    appName: APP_NAME,
    companyName: 'HashiCorp',

    notifyTimeout: 4000,
    sessionPollingTimeoutSeconds: 2.5,
    enableConfirmService: true,

    documentation: {
      baseURL: 'https://boundaryproject.io/help/admin-ui',
      topics: {
        org: '/org',
        'org.new': '/org/new',
        project: '/project',
        'project.new': '/project/new',
        account: '/account',
        'account.new': '/account/new',
        'auth-method': '/auth-method',
        group: '/group',
        'group.add-members': '/group/add-members',
        'host-catalog': '/host-catalog',
        'host-catalog.new': '/host-catalog/new',
        'host-set': '/host-set',
        'host-set.new': '/host-set/new',
        'host-set.add-hosts': '/host-set/add-hosts',
        host: '/host',
        'host.new': '/host/new',
        role: '/role',
        'role.add-principals': '/role/add-principals',
        session: '/session',
        target: '/target',
        'target.new': '/target/new',
        'target.add-host-sets': '/target/add-host-sets',
        user: '/user'
      }
    },

    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicyMeta: true,
    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'frame-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'style-src': ["'self'"],
      'media-src': ["'self'"],
      'manifest-src': ["'self'"],
    },
  };

  // Unsafe policy is necessary in development and test environments, but should
  // not be used in production.
  const enableUnsafeCSP = () => {
    ENV.contentSecurityPolicy['script-src'].push("'unsafe-eval'");
    ENV.contentSecurityPolicy['style-src'].push("'unsafe-inline'");
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-a11y-testing'] = {
      componentOptions: {
        axeOptions: {
          checks: {
            'color-contrast': { options: { noScroll: true } },
          },
        },
      },
    };

    enableUnsafeCSP();
    // TODO: should provide an env var to explicitly add a host to CSP
    // at build time for any environment (not just development),
    // rather than automatically include API_HOST.  Changes to CSP should
    // be explicit.
    if (API_HOST) ENV.contentSecurityPolicy['connect-src'].push(API_HOST);
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    // CSP breaks test coverage, so it is disabled in this environment
    ENV.contentSecurityPolicyMeta = false;

    // Notification timeout should be 0 for fast tests
    ENV.notifyTimeout = 0;
    // Session polling timeout should be short
    ENV.sessionPollingTimeoutSeconds = 0.25;
    ENV.enableConfirmService = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
