import type { Scene } from "@babylonjs/core";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
export interface GUICanvasElement {
    background?: string;
}
export declare class GUICanvasElement extends HTMLElement {
    canvas: AdvancedDynamicTexture;
    safeArea: Rectangle;
    scene: Scene;
    guiCanvas: this;
    private _idealWidth;
    private _idealHeight;
    private _resizeObserver;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _updateSafeArea;
    processChildren(): void;
}
