"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const addColor_js_1 = __importStar(require("./actions/addColor.js"));
const appendPunc_js_1 = __importDefault(require("./actions/appendPunc.js"));
const tranAllHandler_js_1 = __importDefault(require("./handlers/tranAllHandler.js"));
const tranSeleHandler_js_1 = __importDefault(require("./handlers/tranSeleHandler.js"));
function activate(context) {
    const appendComma = vscode_1.default.commands.registerCommand('editor.action.appendComma', () => {
        (0, appendPunc_js_1.default)(',');
    });
    const appendSemicolon = vscode_1.default.commands.registerCommand('editor.action.appendSemicolon', () => {
        (0, appendPunc_js_1.default)(';');
    });
    const tranSele = vscode_1.default.commands.registerCommand('tran.sele', tranSeleHandler_js_1.default);
    const tranAll = vscode_1.default.commands.registerCommand('tran.all', tranAllHandler_js_1.default);
    function setColor(color) {
        return vscode_1.default.commands.registerCommand(`color.${color}`, () => {
            (0, addColor_js_1.default)(addColor_js_1.Color[color]);
        });
    }
    const colorRed = setColor('red');
    const colorGreen = setColor('green');
    const colorBlue = setColor('blue');
    const colorSlate = setColor('slate');
    const colorCoral = setColor('coral');
    function setAutoColor(color) {
        return vscode_1.default.commands.registerCommand(`color.auto.${color}`, () => {
            vscode_1.default.workspace.onDidChangeTextDocument(() => {
                vscode_1.default.commands.executeCommand(`color.${color}`);
            });
        });
    }
    const colorAutoRed = setAutoColor('red');
    const colorAutoGreen = setAutoColor('green');
    const colorAutoBlue = setAutoColor('blue');
    const colorAutoSlate = setAutoColor('slate');
    const colorAutoCoral = setAutoColor('coral');
    context.subscriptions.push(appendComma, appendSemicolon);
    context.subscriptions.push(tranSele, tranAll);
    context.subscriptions.push(colorRed, colorGreen, colorBlue, colorSlate, colorCoral);
    context.subscriptions.push(colorAutoRed, colorAutoGreen, colorAutoBlue, colorAutoSlate, colorAutoCoral);
}
module.exports = {
    activate,
};
