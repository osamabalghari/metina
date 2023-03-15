
exports.up = function(knex) {
  return knex.schema.createTable('team', table => {

    table.specificType('id', 'char(36) primary key');
    table.string('name').notNullable();
    table.string('members');
    table.string('user_id', 36).references('id').inTable('user').onDelete('cascade');
    table.string('description', 256);
    table.string('image', 256);
    table.string('color');
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('team');
};