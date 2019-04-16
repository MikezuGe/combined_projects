const MODULE_TYPES = {
  PRODUCTIVITY: 'PRODUCTIVITY',
  SPEED: 'SPEED',
  EFFICIENCY: 'EFFICIENCY',
};


const MODULES = {
  'Productivity module 1': {
    name: 'Productivity module 1',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: -0.15,
    extraItemBonus: 0.04,
  },
  'Productivity module 2': {
    name: 'Productivity module 2',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: -0.15,
    extraItemBonus: 0.06,
  },
  'Productivity module 3': {
    name: 'Productivity module 3',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: -0.15,
    extraItemBonus: 0.10,
  },
  'Speed module 1': {
    name: 'Speed module 1',
    craftSpeedMultiplier: 0.50,
    type: MODULE_TYPES.SPEED,
  },
  'Speed module 2': {
    name: 'Speed module 2',
    craftSpeedMultiplier: 0.60,
    type: MODULE_TYPES.SPEED,
  },
  'Speed module 3': {
    name: 'Speed module 3',
    type: MODULE_TYPES.SPEED,
    craftSpeedMultiplier: 0.70,
  },
  'Efficiency module 1': {
    name: 'Efficiency module 1',
    type: MODULE_TYPES.EFFICIENCY,
  },
  'Efficiency module 2': {
    name: 'Efficiency module 2',
    type: MODULE_TYPES.EFFICIENCY,
  },
  'Efficiency module 3': {
    name: 'Efficiency module 3',
    type: MODULE_TYPES.EFFICIENCY,
  },
};


export { MODULE_TYPES, };
export default MODULES;
