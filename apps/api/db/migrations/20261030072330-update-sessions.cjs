'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn('sessions', 'title', Sequelize.STRING, {
        transaction,
      })
      await queryInterface.addColumn(
        'sessions',
        'status',
        {
          type: Sequelize.ENUM('regular', 'archived'),
          defaultValue: 'regular',
          allowNull: false,
        },
        { transaction },
      )
      await queryInterface.addColumn('sessions', 'custom', Sequelize.JSONB, {
        transaction,
      })
      await queryInterface.createTable(
        'messages',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          thread_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'sessions', key: 'id' },
            onDelete: 'CASCADE',
          },
          parent_id: {
            type: Sequelize.STRING,
          },
          format: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          content: {
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
      await queryInterface.addIndex('messages', ['thread_id', 'id'], {
        transaction,
      })
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('sessions', 'title', { transaction })
      await queryInterface.removeColumn('sessions', 'status', { transaction })
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_sessions_status";',
        { transaction },
      )
      await queryInterface.removeColumn('sessions', 'custom', { transaction })
      await queryInterface.dropTable('messages', { transaction })
    })
  },
}
