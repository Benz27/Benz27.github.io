import { toNode } from "../js/toNode.js";
import { generateMediaNodes } from "./PortFolioModalElements.js";
export default class PortfolioItem {
    constructor({ name, description = "", title, media, onClick, demo = false, source = false }) {
        const thumbnail = `assets/img/portfolio/${name}/thumbnail.png`;
        const { node, node_structure } = this.buildNode({ thumbnail });
        this.onClick = (typeof onClick === "function") ? onClick : () => { };
        this.description = description;
        this.title = title;
        this.mediaNodes = generateMediaNodes({ name, media });
        this.node = node;
        this.node_structure = node_structure;
        this.demo = demo;
        this.source = source;
    };
    buildNode({ thumbnail }) {
        const node_structure = {
            className: "col-md-6 col-lg-4 mb-5",
            children: [
                {
                    className: "portfolio-item mx-auto",
                    // "data-bs-toggle": "modal",
                    // "data-bs-target": "#portfolioModal",
                    events: {
                        click: (event) => {
                            this.onClick(this);
                        }
                    },
                    children: [
                        {
                            className: "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100",
                            children: [
                                {
                                    className: "portfolio-item-caption-content text-center text-white",
                                    children: [
                                        {
                                            tag: "i",
                                            className: "fas fa-plus fa-3x"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: "img",
                            className: "img-fluid",
                            src: thumbnail
                        }
                    ]
                },
            ]
        };
        const node = toNode(node_structure);
        return { node, node_structure };
    };
}
// <div class="col-md-6 col-lg-4 mb-5">
//     <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal">

//         <div
//             class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
//             <div class="portfolio-item-caption-content text-center text-white"><i
//                     class="fas fa-plus fa-3x"></i>
// </div>
//         </div>
//         <img class="img-fluid" src="assets/img/portfolio/cabin.png" alt="..." />

//     </div>
// </div>