import { MODULE_TYPES, } from './modules';


const RECIPES = {
  'Car': {
    name: 'Car',
    craftTime: 2.00,
    allowedModules: [
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Engine Unit': 8,
      'Iron Plate': 20,
      'Steel Plate': 5,
    },
  },
  'Copper Cable': {
    name: 'Copper Cable',
    craftTime: 0.50,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Copper Plate': 1,
    },
  },
  'Copper Ore': {
    name: 'Copper Ore',
  },
  'Copper Plate': {
    name: 'Copper Plate',
    craftTime: 3.20,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Copper Ore': 1,
    },
  },
  'Engine Unit': {
    name: 'Engine Unit',
    craftTime: 10.00,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Iron Gear Wheel': 1,
      'Pipe': 2,
      'Steel Plate': 1,
    },
  },
  'Green Circuit': {
    name: 'Green Circuit',
    craftTime: 0.50,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Copper Cable': 3,
      'Iron Plate': 1,
    },
  },
  'Iron Gear Wheel': {
    name: 'Iron Gear Wheel',
    craftTime: 0.50,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Iron Plate': 2,
    },
  },
  'Iron Ore': {
    name: 'Iron Ore',
  },
  'Iron Plate': {
    name: 'Iron Plate',
    craftTime: 3.20,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Iron Ore': 1,
    },
  },
  'Pipe': {
    name: 'Pipe',
    craftTime: 0.50,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Iron Plate': 1,
    },
  },
  'Steel Plate': {
    name: 'Steel Plate',
    craftTime: 16.00,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
    requires: {
      'Iron Plate': 5,
    },
  },
};


(() => {
  const names = Object.keys(RECIPES);
  const values = Object.values(RECIPES);
  console.log(names, values);
  names.forEach(name => {
    if (!values.find(recipe => recipe.name === name)) {
      throw new Error(`Unable to find recipe with name '${name}', ${values}`);
    }
  });
  values.forEach(({ requires, }) => {
    if (!requires) {
      return;
    }
    Object.keys(requires).forEach(key => {
      if (!names.includes(key)) {
        throw new Error(`Unable to find required item named '${key}'`);
      }
    });
  });
})();


export default RECIPES;
