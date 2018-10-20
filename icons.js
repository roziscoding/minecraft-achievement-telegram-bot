const dictionary = [
  { name: 'Stone', number: 20 },
  { name: 'Grass', number: 1 },
  { name: 'Wooden Plank', number: 21 },
  { name: 'Crafting Table', number: 13 },
  { name: 'Furnace', number: 18 },
  { name: 'Chest', number: 17 },
  { name: 'Bed', number: 9 },
  { name: 'Coal', number: 31 },
  { name: 'Iron', number: 22 },
  { name: 'Gold', number: 23 },
  { name: 'Diamond', number: 2 },
  { name: 'Sign', number: 11 },
  { name: 'Book', number: 19 },
  { name: 'Wooden Door', number: 24 },
  { name: 'Iron Door', number: 25 },
  { name: 'Redstone', number: 14 },
  { name: 'Rail', number: 12 },
  { name: 'Bow', number: 33 },
  { name: 'Arrow', number: 34 },
  { name: 'Iron Sword', number: 32 },
  { name: 'Diamond Sword', number: 3 },
  { name: 'Iron Chestplate', number: 35 },
  { name: 'Diamond Chestplate', number: 26 },
  { name: 'TNT', number: 6 },
  { name: 'Flint And Steel', number: 27 },
  { name: 'Fire', number: 15 },
  { name: 'Bucket', number: 36 },
  { name: 'Water Bucket', number: 37 },
  { name: 'Lava Bucket', number: 38 },
  { name: 'Cookie', number: 7 },
  { name: 'Cake', number: 10 },
  { name: 'Milk Bucket', number: 39 },
  { name: 'Creeper', number: 4 },
  { name: 'Pig', number: 5 },
  { name: 'Spawn Egg', number: 30 },
  { name: 'Heart', number: 8 },
  { name: 'Cobweb', number: 16 },
  { name: 'Potion', number: 28 },
  { name: 'Splash Potion', number: 29 }
]

module.exports = new Proxy(dictionary, {
  get (target, property) {
    if (property === 'names') {
      return target.map(({ name }) => name)
    }

    const { number: icon } = target.find(({ name }) => {
      const treatedName = name.toLowerCase().trim().replace(/\s/ig, '_')
      const treatedProperty = property.toLowerCase().trim().replace(/\s/ig, '_')

      return treatedName === treatedProperty
    }) || {}

    return icon || 1
  }
})
