export default () => ({
  async isUsernameUnique(username: string) {
    const user = await strapi.db
      .query('plugin::users-permissions.user')
      .findOne({
        where: { username: { $iLike: username } }, // $iLike for case-insensitive check
      });

    return !user; // Returns true if no user was found
  },
  async updatePhone(id: number | string, phone: string) {
    // Використовуємо низькорівневий запит до БД
    if (phone && id) {
      const updatedUser = await strapi.db
        .query('plugin::users-permissions.user')
        .update({
          where: { id },
          data: { phone: phone.replace(/\D/g, '').slice(0, 15) },
        });

      return updatedUser;
    }
    return null;
  },
});
