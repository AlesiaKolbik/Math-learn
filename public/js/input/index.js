import { Formula } from './model/formula.js';
import { Validator } from './model/validator.js';
import { KeypadView } from './view/keypadView.js';
import { FormulaViewInput } from './view/formula.js';
import { FormulaController } from './controller/formula.js';



const formula = new Formula(new Validator());
const input = new FormulaViewInput();
const keypadView = new KeypadView();
const controller = new FormulaController(formula, input, keypadView);

