'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'sessions',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
          },
          user_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      )
      await queryInterface.addIndex('sessions', ['user_id', 'updated_at'], {
        transaction,
      })

      await queryInterface.createTable(
        'session_items',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          session_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'sessions', key: 'id' },
            onDelete: 'CASCADE',
          },
          item: {
            type: Sequelize.JSONB,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      )
      await queryInterface.addIndex('session_items', ['session_id', 'id'], {
        transaction,
      })
    })
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('session_items', { transaction })
      await queryInterface.dropTable('sessions', { transaction })
    })
  },
}
