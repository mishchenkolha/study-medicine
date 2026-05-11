export default () => ({
  async isUsernameUnique(username: string) {
    const user = await strapi.db
      .query('plugin::users-permissions.user')
      .findOne({
        where: { username: { $iLike: username } }, // $iLike for case-insensitive check
      });

    return !user; // Returns true if no user was found
  },
});
