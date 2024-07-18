import { toNode } from "../js/toNode.js";

class CarouselItem {

    constructor({ name, mediaItem, active = false }) {
        const src = `assets/img/portfolio/${name}/ss/${mediaItem}.png`;
        const { node_structure } = this.buildNodeStructure({ src, active });
        this.node_structure = node_structure;
    };

    buildNodeStructure({ src, active }) {
        const node_structure = {
            className: `carousel-item ${(active) ? "active" : ""}`,
            children: [
                {
                    tag: "img",
                    className: "bd-placeholder-img bd-placeholder-img-lg d-block w-100",
                    width: "800",
                    height: "400",
                    focusable: "false",
                    src
                }
            ]
        }
        // const node = toNode(node_structure);
        return { node_structure };
    };
};

export const generateMediaNodes = ({ name, media }) => {
    const structs = [];
    let index = 0;
    for (const mediaItem of media) {
        const cItem = new CarouselItem({ mediaItem, name, active: index === 0 });
        structs.push(cItem.node_structure);
        index++;
    };
    return structs;
};