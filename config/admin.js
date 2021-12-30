module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9331cfc8d812618e619158cede46e79b'),
  },
});
