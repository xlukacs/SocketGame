/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('shop_items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('shop_items').insert([
        { id: 1, category: "laser", name: 'LF-3', price: 1000, currency: 'uridium', desc:'A great lasergun', pic:'lasers/pic/lf3.png', item_id:'lasers-lf3' },
        { id: 2, category: "shield", name: 'SHD-BO3', price: 12000, currency: 'credits', desc:'A great shield generator', pic:'generators/pic/shdbo3.png', item_id:'generators-shield-shdbo3' },
        { id: 3, category: "ship", name: 'Goliath', price: 10000, currency: 'uridium', desc:'"A powerfull ship', pic:'ships/pic/goliath.png', item_id:'ship-goliath' },
      ]);
    });
};
