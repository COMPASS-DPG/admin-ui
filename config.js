const courseManagerBackendUrl =
  process.env.NEXT_PUBLIC_COURSE_MANAGER_SERVICE_BACKEND_URL ||
  'http://http://0.0.0.0:4030';

const wpcasBackendUrl =
  process.env.NEXT_PUBLIC_WPCAS_SERVICE_BACKEND_IP || 'http://0.0.0.0:4010';

const marketBackendUrl =
  process.env.NEXT_PUBLIC_MARKETPLACE_SERVICE_BACKEND_IP ||
  'http://0.0.0.0:4020';

module.exports = {
  wpcasBackendUrl,
  marketBackendUrl,
  courseManagerBackendUrl,
};
