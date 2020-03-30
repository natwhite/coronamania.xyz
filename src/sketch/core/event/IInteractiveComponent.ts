import {EventEmitter} from 'events';
import {ClickEvent} from './ClickEvent';
import {DragMouseEvent} from './DragMouseEvent';

export interface IInteractiveComponent {
    onInteraction: EventEmitter;

    registerBounds(s: any): any;

    onClick(clickEvent: ClickEvent): void;

    onMouseDrag(dragEvent: DragMouseEvent): void;

    onHover(): void;

    onHoverLost(): void;
}
