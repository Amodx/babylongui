import { Image } from "@babylonjs/gui/2D/controls/image";
import { GUIElement } from "./GUIElement";
import { Control } from "@babylonjs/gui";
export interface GUIImageElement {
    stretch?: number;
    autoScale?: boolean;
    cellId?: number;
    cellHeight?: number;
    cellWidth?: number;
    sourceLeft?: number;
    sourceTop?: number;
    sourceWidth?: number;
    sourceHeight?: number;
    domImage?: HTMLImageElement;
    sliceLeft?: number;
    sliceTop?: number;
    sliceBottom?: number;
    sliceRight?: number;
    scaleX?: number;
    scaleY?: number;
    transformCenterX?: number;
    transformCenterY?: number;
    rotation?: number;
    alpha?: number;
    color?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowColor?: string;
    isEnabled?: boolean;
    isHitTestVisible?: boolean;
    clipContent?: number;
}
export declare class GUIImageElement extends GUIElement {
    image: Image;
    get source(): string | null;
    set source(value: string | null);
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    private styleChanged;
    onMounted: (elm: GUIImageElement) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    processChildren(): void;
    getControl(): Control;
}
