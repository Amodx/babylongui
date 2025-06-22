import { Control } from "@babylonjs/gui/2D/controls/control";
import { Animation as BabylonAnimation } from "@babylonjs/core/Animations/animation";
import type { Scene } from "@babylonjs/core";
import { GUICanvasElement } from "./GUICanvas.element";
declare class AnimationProxy extends Animation {
    target: any;
    duration: number;
    loop: boolean;
    _animations: BabylonAnimation[];
    _scene: Scene;
    constructor(target: any, duration: number, loop: boolean, _animations: BabylonAnimation[], _scene: Scene);
    play(): this;
}
export interface GUIElement {
}
export declare abstract class GUIElement extends HTMLElement {
    static GUIBaseAttributeNames: string[];
    get width(): string;
    set width(value: string);
    get height(): string;
    set height(value: string);
    get left(): string;
    set left(value: string);
    get top(): string;
    set top(value: string);
    get paddingTop(): string;
    set paddingTop(value: string);
    get paddingBottom(): string;
    set paddingBottom(value: string);
    get paddingLeft(): string;
    set paddingLeft(value: string);
    get paddingRight(): string;
    set paddingRight(value: string);
    get zIndex(): number | undefined;
    set zIndex(value: number | undefined);
    get horizontalAlignment(): number | undefined;
    set horizontalAlignment(value: number | undefined);
    get verticalAlignment(): number | undefined;
    set verticalAlignment(value: number | undefined);
    readonly guiElement: true;
    guiCanvas: GUICanvasElement;
    abstract getControl(): Control;
    init(): void;
    animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions): AnimationProxy;
}
export {};
