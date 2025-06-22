import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { GUIElement } from "./GUIElement";
import { Control } from "@babylonjs/gui";
export interface GUITextElement {
    text?: string;
    color?: string;
    fontSize?: string | number;
    fontFamily?: string;
    textWrapping?: boolean;
    resizeToFit?: boolean;
    textHorizontalAlignment?: number;
    textVerticalAlignment?: number;
    lineSpacing?: string;
    outlineWidth?: number;
    outlineColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowColor?: string;
}
export declare class GUITextElement extends GUIElement {
    textBlock: TextBlock;
    private observer;
    constructor();
    private styleChanged;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    processChildren(): void;
    getControl(): Control;
}
