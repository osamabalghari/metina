
exports.up = function(knex) {
  return knex.schema.createTable('product', table => {
    table.specificType('id', 'char(36) primary key');
    table.string('name').notNullable();
    table.string('color');
    table.string('team_id', 36).references('id').inTable('team').onDelete('cascade');
    table.string('description', 256);
    table.string('logo', 256);
    table.enu('status', ['active', 'killed']).notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};