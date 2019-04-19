import React, { useState, useMemo, } from 'react';
import ReactDOM from 'react-dom';

import SimpleSelector from './SimpleSelector';
import {
  ASSEMBLERS,
  MODULES,
  MODULE_TYPES,
  RECIPES,
} from './constants';


const App = () => {
  ASSEMBLERS['Assembler 3']
  //const [ assembler, setAssembler, ] = useState(undefined);
  //const [ recipe, setRecipe, ] = useState(undefined);
  const [ assembler, setAssembler, ] = useState(ASSEMBLERS['Assembler 3']);
  const [ recipe, setRecipe, ] = useState(RECIPES['Green Circuit']);
  
  // Doesn't update :(
  const [ modules, setModules, ] = useState({
    m0: undefined,
    m1: undefined,
    m2: undefined,
    m3: undefined,
  });

  const setModulesAmount = amount => setModules(prevModules =>
    Object.entries(prevModules).reduce((total, [ key, value, ], i) =>
      ({ ...total, [key]: i < amount ? value : undefined, }), {}));

  const filterModules = allowed => setModules(prevModules =>
    Object.entries(prevModules).reduce((total, [ key, value, ]) =>
      ({ ...total, [key]: value && allowed.includes(value.type) ? value : undefined, }), {}));

  const { craftSpeedMultiplier, } = assembler;
  const {
    totalModuleSpeed,
    totalModuleProductivity,
  } = useMemo(() => Object.values(modules).reduce((total, module) => (console.log(module), module
    ? {
      totalModuleSpeed: total.totalModuleSpeed + (module.craftSpeedMultiplier ? module.craftSpeedMultiplier : 0),
      totalModuleProductivity: total.totalModuleProductivity + (module.extraItemBonus ? module.extraItemBonus : 0),
    } : total), {
    totalModuleSpeed: 0,
    totalModuleProductivity: 0,
  }), [ modules, ]);
  const { craftTime, } = recipe;

  console.log(
    craftSpeedMultiplier,
    totalModuleSpeed,
    totalModuleProductivity,
    craftTime,
  );

  return (
    <div>
      <SimpleSelector
        label={'Assembler'}
        items={ASSEMBLERS}
        onChange={item => {
          setAssembler(item);
          setModulesAmount(item.moduleSlots);
        }}
        initialValue={assembler}
      />
      <SimpleSelector
        label={'Recipe'}
        items={RECIPES}
        onChange={item => {
          setRecipe(item);
          filterModules(item.allowedModules);
        }}
        initialValue={recipe}
      />
      {assembler && recipe && (
        Array(assembler.moduleSlots).fill().map((undefined, i) => {
          return (
            <SimpleSelector
              key={i}
              label={`Module ${i}`}
              items={Object.entries(MODULES).reduce((total, [ key, value, ]) => 
                recipe.allowedModules.includes(value.type)
                  ? (total[key] = value, total)
                  : total, {})}
              onChange={item => setModules(prevModules => ({
                ...prevModules,
                [`m${i}`]: item,
              }))}
              nullable
            />
          )
        })
      )}
    </div>
  );
};


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
