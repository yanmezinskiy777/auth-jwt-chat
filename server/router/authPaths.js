const base = "/auth";

const path = {
  registration: `${base}/registration`,
  login: `${base}/login`,
  logout: `${base}/logout`,
  activate: `${base}/activate/:link`,
  refresh: `${base}/refresh`,
  users: `${base}/users`,
};

module.exports = path;
