/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://eeividadecrianca.com.br",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
