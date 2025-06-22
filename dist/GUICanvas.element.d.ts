import type { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
export interface GUICanvasElement {
    background?: string;
}
export declare class GUICanvasElement extends HTMLElement {
    canvas: AdvancedDynamicTexture;
    scene: Scene;
    guiCanvas: this;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    processChildren(): void;
}
