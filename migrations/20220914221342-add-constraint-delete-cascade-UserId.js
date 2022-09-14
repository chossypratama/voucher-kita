'use strict'

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('UserProfiles', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'User_UserId_fkey',
      references: {
        //Required field
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('UserProfiles', 'User_UserId_fkey')
  },
}
