export function draggable(node: HTMLElement) {

    node.style.position = 'absolute';
    node.style.zIndex = '9999999';

    let dragNode = node.querySelector(".drag-area") as HTMLElement;

    dragNode.style.cursor = "move";

    let startX = 0;
    let startY = 0;

    function pointerdown(e: PointerEvent) {


        const box = node.getBoundingClientRect();
        let { x, y } = box;

        startX = e.clientX - x;
        startY = e.clientY - y;

        window.addEventListener('pointermove', pointermove);

        window.addEventListener('pointerup', () => {
            // @ts-ignore -- once is allowed
            window.removeEventListener('pointermove', pointermove, { once: true });
        });
    }

    function pointermove(e: PointerEvent) {
        const box = node.getBoundingClientRect();

        let { x, y, right, bottom } = box;

        let t = e.clientY - startY;
        let l = e.clientX - startX;

        let changeVertical = t - y;
        let changeHorizontal = l - x;

        let r = window.innerWidth - right - changeHorizontal;
        let b = window.innerHeight - bottom - changeVertical;

        node.style.top = `${t}px`;
        node.style.left = `${l}px`;
        // node.style.bottom = `${b}px`;
        // node.style.right = `${r}px`;
    }

    dragNode.addEventListener("pointerdown", pointerdown);

    return {
        destroy: () => dragNode.removeEventListener('pointerdown', pointerdown)
    }
}