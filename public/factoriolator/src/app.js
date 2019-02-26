import React, { useState, } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import SimpleSelector from './SimpleSelector';


// Add pollution to everything

const MODULE_TYPES = {
  PRODUCTIVITY: 'PRODUCTIVITY',
  SPEED: 'SPEED',
  EFFICIENCY: 'EFFICIENCY',
};


const MODULES = {
  'Productivity module 1': {
    name: 'Productivity module 1',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: 0.85,
    extraItemBonus: 1.04,
  },
  'Productivity module 2': {
    name: 'Productivity module 2',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: 0.85,
    extraItemBonus: 1.06,
  },
  'Productivity module 3': {
    name: 'Productivity module 3',
    type: MODULE_TYPES.PRODUCTIVITY,
    craftSpeedMultiplier: 0.85,
    extraItemBonus: 1.1,
  },
  'Speed module 1': {
    name: 'Speed module 1',
    craftSpeedMultiplier: 1.5,
    type: MODULE_TYPES.SPEED,
  },
  'Speed module 2': {
    name: 'Speed module 2',
    craftSpeedMultiplier: 1.6,
    type: MODULE_TYPES.SPEED,
  },
  'Speed module 3': {
    name: 'Speed module 3',
    type: MODULE_TYPES.SPEED,
    craftSpeedMultiplier: 1.7,
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


const ITEMS = {
  'Green Circuit': {
    name: 'Green Circuit',
    craftTime: 0.5,
    allowedModules: [
      MODULE_TYPES.PRODUCTIVITY,
      MODULE_TYPES.SPEED,
      MODULE_TYPES.EFFICIENCY,
    ],
  },
};


const ASSEMBLERS = {
  'Assembler 1': {
    name: 'Assembler 1',
    craftSpeedMultiplier: 0.5,
    moduleSlots: 0,
  },
  'Assembler 2': {
    name: 'Assembler 2',
    craftSpeedMultiplier: 0.75,
    moduleSlots: 2,
  },
  'Assembler 3': {
    name: 'Assembler 3',
    craftSpeedMultiplier: 1.25,
    moduleSlots: 4,
  },
};


const Cell = styled.td`
padding: 0.5em;
`;


const App = () => {
  const [ recipe, setRecipe, ] = useState(ITEMS['Green Circuit'] || null);
  const [ assembler, setAssembler, ] = useState(ASSEMBLERS['Assembler 3'] || null);
  const [ modules, setModules, ] = useState(Array(4).fill(MODULES['Productivity module 3']) || []);

  const totalModuleSpeedMultiplier = 1 - modules.reduce((total, { craftSpeedMultiplier, }) => (total += (1 - craftSpeedMultiplier || 0), total), 0);
  const totalModuleProductivityMultiplier = 1 + modules.reduce((total, { extraItemBonus, }) => (total += extraItemBonus - 1 || 0, total), 0);

  return (
    <React.Fragment>
      <SimpleSelector
        label={'Recipe'}
        items={Object.keys(ITEMS)}
        onItemSelected={item => {
          setRecipe(ITEMS[item]);
          setModules([]);
        }}
        value={recipe.name}
      />
      <SimpleSelector
        label={'Assembler'}
        items={Object.keys(ASSEMBLERS)}
        onItemSelected={item => {
          setAssembler(ASSEMBLERS[item]);
          setModules([]);
        }}
        value={assembler.name}
      />
      {recipe
        && assembler
        && Array(assembler.moduleSlots)
          .fill()
          .map((n, i) => (
            <SimpleSelector
              key={i}
              label={`Module ${i + 1}`}
              items={Object.entries(MODULES)
                .filter(([ , values, ]) => recipe.allowedModules.includes(values.type))
                .map(([ key, ]) => key)}
              onItemSelected={item => setModules(prevModules => (prevModules[i] = MODULES[item] || {}, prevModules))}
              value={modules[i] && modules[i].name}
              canUseNull
            />
          ))
      }

      <h1>
        {'Selection statistics'}
      </h1>
      <table>
        <tbody>
          <tr>
            <Cell>
              {'Assembler'}
            </Cell>
          </tr>
          {assembler && (
            <React.Fragment>
              <tr>
                <Cell>{'Name'}</Cell>
                <Cell>{'Speed multiplier'}</Cell>
                <Cell>{'Modul slots'}</Cell>
              </tr>
              <tr>
                <Cell>{assembler.name}</Cell>
                <Cell>{assembler.craftSpeedMultiplier}</Cell>
                <Cell>{assembler.moduleSlots}</Cell>
              </tr>
            </React.Fragment>
          )}
          <tr>
            <Cell>
              {'Recipe'}
            </Cell>
          </tr>
          {recipe && (
            <React.Fragment>
              <tr>
                <Cell>{'Name'}</Cell>
                <Cell>{'Craft time'}</Cell>
                <Cell>{'Allowed modules'}</Cell>
              </tr>
              <tr>
                <Cell>{recipe.name}</Cell>
                <Cell>{recipe.craftTime}</Cell>
                <Cell>{recipe.allowedModules.join(', ')}</Cell>
              </tr>
            </React.Fragment>
          )}
          <tr>
            <Cell>
              {'Modules'}
            </Cell>
          </tr>
          {!!modules.length && (
            <tr>
              <Cell>{'Name'}</Cell>
              <Cell>{'Type'}</Cell>
              <Cell>{'Craft speed multiplier'}</Cell>
              <Cell>{'Extra item bonus'}</Cell>
            </tr>
          )}
          {modules.map(({ name, type, craftSpeedMultiplier, extraItemBonus, }, i) => (
            <tr key={i}>
              <Cell>{name}</Cell>
              <Cell>{type}</Cell>
              <Cell>{craftSpeedMultiplier || '-'}</Cell>
              <Cell>{extraItemBonus || '-'}</Cell>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>
        {'Multipliers and craft times'}
      </h1>
      <table>
        <tbody>
          {recipe && assembler && (
            <React.Fragment>
              <tr>
                <Cell>{''}</Cell>
                <Cell>{'Multiplier'}</Cell>
                <Cell>{'Time for 1 item'}</Cell>
                <Cell>{'Time for 1 item (with productivity)'}</Cell>
                <Cell>{'Items per second'}</Cell>
                <Cell>{'Items per second (with productivity)'}</Cell>
              </tr>
              <tr>
                <Cell>{'Base'}</Cell>
                <Cell>{'1'}</Cell>
                <Cell>{recipe.craftTime}</Cell>
                <Cell />
                <Cell>{1 / recipe.craftTime}</Cell>
                <Cell />
              </tr>
              <tr>
                <Cell>{'Assembler multipier'}</Cell>
                <Cell>{assembler.craftSpeedMultiplier}</Cell>
                <Cell>{recipe.craftTime / assembler.craftSpeedMultiplier}</Cell>
                <Cell />
                <Cell>{1 / (recipe.craftTime / assembler.craftSpeedMultiplier)}</Cell>
                <Cell />
              </tr>
              <tr>
                <Cell>{'Assembler & modules multipliers'}</Cell>
                <Cell>{assembler.craftSpeedMultiplier * totalModuleSpeedMultiplier}</Cell>
                <Cell>{recipe.craftTime / (assembler.craftSpeedMultiplier * totalModuleSpeedMultiplier)}</Cell>
                <Cell>{recipe.craftTime / (assembler.craftSpeedMultiplier * totalModuleSpeedMultiplier) * totalModuleProductivityMultiplier}</Cell>
                <Cell>{1 / (recipe.craftTime / (assembler.craftSpeedMultiplier * totalModuleSpeedMultiplier))}</Cell>
                <Cell>{1 / (recipe.craftTime / (assembler.craftSpeedMultiplier * totalModuleSpeedMultiplier) * totalModuleProductivityMultiplier)}</Cell>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </table>

      <h1>
        {'Results'}
      </h1>
      <table>
        <tbody>
          <tr>
            <td>
              {}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
