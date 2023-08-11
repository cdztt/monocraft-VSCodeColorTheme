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
const addColor_1 = __importStar(require("./handlers/addColor"));
const appendPunc_1 = __importDefault(require("./handlers/appendPunc"));
const changeMultiCursorsStyle_1 = __importDefault(require("./handlers/changeMultiCursorsStyle"));
const insertArrow_1 = __importDefault(require("./handlers/insertArrow"));
const insertBlock_1 = __importDefault(require("./handlers/insertBlock"));
const insertSpaceBehind_1 = __importDefault(require("./handlers/insertSpaceBehind"));
const tranAllHandler_1 = __importDefault(require("./handlers/tranAllHandler"));
const tranSeleHandler_1 = __importDefault(require("./handlers/tranSeleHandler"));
const fetchTranslated_1 = require("./utils/fetchTranslated");
function activate(context) {
    vscode_1.default.window.onDidChangeTextEditorSelection(changeMultiCursorsStyle_1.default);
    const editAppendComma = vscode_1.default.commands.registerCommand('edit.appendComma', appendPunc_1.default.bind(null, ','));
    const editInsertBlock = vscode_1.default.commands.registerCommand('edit.insertBlock', insertBlock_1.default);
    const editInsertArrow = vscode_1.default.commands.registerCommand('edit.insertArrow', insertArrow_1.default);
    const editInsertSpaceBehind = vscode_1.default.commands.registerCommand('edit.insertSpaceBehind', insertSpaceBehind_1.default);
    const tranSele = vscode_1.default.commands.registerCommand('tran.sele', tranSeleHandler_1.default.bind(null, fetchTranslated_1.Lang.zh));
    const tranSeleToEn = vscode_1.default.commands.registerCommand('tran.seleToEn', tranSeleHandler_1.default.bind(null, fetchTranslated_1.Lang.en));
    const tranAll = vscode_1.default.commands.registerCommand('tran.all', tranAllHandler_1.default);
    function setColor(color) {
        return vscode_1.default.commands.registerCommand(`color.${color}`, () => {
            (0, addColor_1.default)(addColor_1.Color[color]);
        });
    }
    const colorRed = setColor('red');
    const colorGreen = setColor('green');
    const colorBlue = setColor('blue');
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
    const colorAutoCoral = setAutoColor('coral');
    context.subscriptions.push(editAppendComma, editInsertBlock, editInsertArrow, editInsertSpaceBehind);
    context.subscriptions.push(tranSele, tranSeleToEn, tranAll);
    context.subscriptions.push(colorRed, colorGreen, colorBlue, colorCoral);
    context.subscriptions.push(colorAutoRed, colorAutoGreen, colorAutoBlue, colorAutoCoral);
}
module.exports = {
    activate,
};
