
exports.up = function(knex) {
  return knex.schema.createTable('star-products', table => {
    table.specificType('id', 'char(36) primary key');
    table.string('user_id', 36).references('id').inTable('user').onDelete('cascade');
    table.string('product_id', 36).references('id').inTable('product').onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('star-products');
};