
exports.up = function(knex) {
  return knex.schema.createTable('team_members', table => {

    table.specificType('id', 'char(36) primary key');
    table.string('team_id', 36).notNullable().references('id').inTable('team').onDelete('cascade');
    table.string('user_id', 36).notNullable().references('id').inTable('user').onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('team_members');
};