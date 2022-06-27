export function draggable(node: HTMLElement) {

    node.style.position = 'absolute';
    node.style.zIndex = '9999999';

    const box = node.getBoundingClientRect();
    let { width, height } = box;

    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    let dragNode = node.querySelector(".drag-area") as HTMLElement;

    dragNode.style.cursor = "move";

    let startX = 0;
    let startY = 0;

    let firstMove = true;

    function pointerdown(e: PointerEvent) {

        node.dispatchEvent(new CustomEvent('draggablestart', {
            detail: {}
        }));

        const box = node.getBoundingClientRect();
        let { x, y } = box;

        startX = e.clientX - x;
        startY = e.clientY - y;


        window.addEventListener('pointermove', pointermove);

        window.addEventListener('pointerup', () => {
            firstMove = true;

            node.dispatchEvent(new CustomEvent('draggablestop', {
                detail: {}
            }));

            window.removeEventListener('pointermove', pointermove);
        }, { once: true });
    }

    function pointermove(e: PointerEvent) {

        if (firstMove) {

            node.dispatchEvent(new CustomEvent('draggablemove', {
                detail: {}
            }));

            firstMove = false;
        }

        window.getSelection()?.removeAllRanges();

        node.dispatchEvent

        const box = node.getBoundingClientRect();

        let { width, height } = box;

        // account for the mouses starting position so we can drag anywhere
        // within the dragNode and not just at the borders
        let top = e.clientY - startY;
        let left = e.clientX - startX;

        // change the elements position
        node.style.top = `${top}px`;
        node.style.left = `${left}px`;

        // manually set width and height so element size doesn't respond on screen border
        node.style.width = `${width}px`;
        node.style.height = `${height}px`;
    }

    dragNode.addEventListener("pointerdown", pointerdown);

    return {
        destroy: () => dragNode.removeEventListener('pointerdown', pointerdown)
    }
}