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

    buildNodeIFrameStructure({ src, active }) {
        const node_structure = {
            className: `carousel-item ${(active) ? "active" : ""}`,
            children: [
                {
                    tag: "iframe",
                    height: "400",
                    width:"800",
                    src,
                    title:src,
                    frameborder:"0" ,
                    allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen : true
                }
            ]
        }
        // const node = toNode(node_structure);
        return { node_structure };
    };
};

class IFrameCarouselItem {


    constructor({  video, active = false }) {
        const { node_structure } = this.buildNodeStructure({ video, active });
        this.node_structure = node_structure;
    };

    buildNodeStructure({ video, active }) {
        const node_structure = {
            className: `carousel-item ${(active) ? "active" : ""}`,
            children: [
                {
                    tag: "iframe",
                    height: "400",
                    width:"600",
                    src: video,
                    title: "Youtube Video Player",
                    frameborder:"0" ,
                    allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen : true
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


export const generateIFrameMediaNodes = ({ videos }) => {
    if (!videos) return [];
    const structs = [];
    let index = 0;
    for (const videoItem of videos) {
        const cItem = new IFrameCarouselItem({ video:videoItem });
        structs.push(cItem.node_structure);
        index++;
    };
    return structs;
};