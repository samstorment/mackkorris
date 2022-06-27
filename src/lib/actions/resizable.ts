
interface Params {
    staticShrink: boolean
}

export function resizable(node: HTMLDivElement, params?: Params) {

    const directions = ['n','s','e','w','ne','nw','se','sw'];

    const destructions = directions.map(d => {
        const element = node.querySelector(`.resize-${d}`) as HTMLDivElement;

        const handleType = getHandle(d as Direction);

        const handle = new handleType(element, node);

        return () => element.removeEventListener('pointerdown', handle.pointerDown);
    });

    return {
        destroy: () => destructions.forEach(d => d())
    }
}


type Direction = 'n' | 's' | 'e' | 'w' | 'ne' | 'se' | 'nw' | 'sw';

function getHandle(direction: Direction) : typeof Handle {
    switch (direction) {
        case 'n' : return North;
        case 's' : return South;
        case 'e' : return East;
        case 'w' : return West;
        case 'nw': return NorthWest;
        case 'ne': return NorthEast;
        case 'sw': return SouthWest;
        case 'se': return SouthEast;
    }
}

class Handle {

    // mouse start positions on pointer down RELATIVE TO parent
    // top left of parent is 0, 0
    startX = 0;
    startY = 0;

    // parent dimensions on pointer down
    startWidth = 0;
    startHeight = 0;

    // current x and y position RELATIVE TO
    currX = 0;
    currY = 0;

    // distance from currX to 
    changeX = 0;
    changeY = 0;

    // box at the start of pointer down
    startBox: DOMRect = new DOMRect();

    // element dom rect before ANY dom events happen
    baseBox: DOMRect;

    // current state of the dom rect
    box: DOMRect = new DOMRect();

    handle: HTMLDivElement;
    parent: HTMLDivElement;

    constructor(handle: HTMLDivElement, parent: HTMLDivElement) {
        this.handle = handle;
        this.parent = parent;
        
        this.baseBox = parent.getBoundingClientRect();

        handle.addEventListener('pointerdown', this.pointerDown.bind(this));
    }

    pointerDown(e: PointerEvent) {
        if (this.shouldIgnoreEvent()) return;

        this.startBox = this.parent.getBoundingClientRect();

        this.startX = e.clientX - this.startBox.x;
        this.startY = e.clientY - this.startBox.y;

        const move = this.pointerMove.bind(this);

        window.addEventListener('pointermove', move);

        window.addEventListener('pointerup', () => {
            window.removeEventListener('pointermove', move);
        }, { once: true });
    }

    pointerMove(e: PointerEvent) {

        if (this.shouldIgnoreEvent()) return;

        // remove highlighting while dragging
        window.getSelection()?.removeAllRanges();

        this.box = this.parent.getBoundingClientRect();

        let { x, y, right, bottom, left, width, height } = this.box;

        this.currY = e.clientY - this.startY;
        this.currX = e.clientX - this.startX;

        this.changeY = this.currY - y;
        this.changeX = this.currX - x;
    }

    shouldIgnoreEvent() {
        return this.parent.classList.contains("full");
    }
} 


class North extends Handle {

    pointerMove(e: PointerEvent) {
        super.pointerMove(e);

        // calculate the new height based on updated cursor position
        let newHeight = this.box.height - this.changeY;
        
        // don't let element shrink below original height
        let height = Math.max(this.baseBox.height, newHeight);

        this.parent.style.top = `${this.currY}px`;
        this.parent.style.height = `${height}px`;
    }
}

class West extends Handle {
    pointerMove(e: PointerEvent): void {
        super.pointerMove(e);

        // calculate the new width based on updated cursor position
        let newWidth = this.box.width - this.changeX;

        // don't let element shrink below original height
        let width = Math.max(this.baseBox.width, newWidth);

        this.parent.style.left = `${this.currX}px`;
        this.parent.style.width = `${width}px`;

    }
}

class South extends Handle {
    pointerMove(e: PointerEvent) {
        super.pointerMove(e);

        // calculate the new height based on updated cursor position
        let newHeight = this.startBox.height + this.changeY;
        
        // don't let element shrink below original height
        let height = Math.max(this.baseBox.height, newHeight);

        // if the element can't shrink any further
        if (height === this.baseBox.height) {

            let top = this.startBox.height - this.baseBox.height + this.currY;

            return this.parent.style.top = `${top}px`;
        } 
            
        this.parent.style.height = `${height}px`;

    }
}

class East extends Handle {
    pointerMove(e: PointerEvent) {
        super.pointerMove(e);

        // calculate the new height based on updated cursor position
        let newWidth = this.startBox.width + this.changeX;
    
        // don't let element shrink below original height
        let width = Math.max(this.baseBox.width, newWidth);

        // if the element can't shrink any further
        if (width === this.baseBox.width) {

            let left = this.startBox.width - this.baseBox.width + this.currX;

            return this.parent.style.left = `${left}px`;
        } 
            
        this.parent.style.width = `${width}px`;
    }
}

class NorthWest extends Handle {

    north = new North(this.handle, this.parent);
    west = new West(this.handle, this.parent);

    pointerMove(e: PointerEvent): void {
        this.north.pointerMove.bind(this);
        this.west.pointerMove.bind(this);
    }
}

class NorthEast extends Handle {

    north = new North(this.handle, this.parent);
    east = new East(this.handle, this.parent);

    pointerMove(e: PointerEvent): void {
        this.north.pointerMove.bind(this);
        this.east.pointerMove.bind(this);
    }
}

class SouthWest extends Handle {

    south = new South(this.handle, this.parent);
    west = new West(this.handle, this.parent);

    pointerMove(e: PointerEvent): void {
        this.south.pointerMove.bind(this);
        this.west.pointerMove.bind(this);
    }
}

class SouthEast extends Handle {

    south = new South(this.handle, this.parent);
    east = new East(this.handle, this.parent);

    pointerMove(e: PointerEvent): void {
        this.south.pointerMove.bind(this);
        this.east.pointerMove.bind(this);
    }
}
