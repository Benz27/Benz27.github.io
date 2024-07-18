

export function ConvertStringToHTML(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    var body_doc = doc.body;
    return body_doc.childNodes[0];
}

// 

export function toNode(props) {
    if (!props) {
        return null;
    };
    if (props instanceof Node) {
        return props;
    };

    if (Array.isArray(props)) {
        return createChildren(props);
    };

    if (typeof props !== 'object') {
        return document.createTextNode(props);
    };

    const { tag = "div",
        events = {},
        className = "",
        children = [], ...rest } = props;
    const node = document.createElement(tag);
    node.className = className;
    const specialAttributes = {
        tag: true,
        className: true,
        onNodeReady: true,
        events: true,
        children: true,
    };
    for (const attr in rest) {
        if (specialAttributes[attr]) continue;
        node.setAttribute(attr, rest[attr] ?? true);
    };
    for (const event in events) {
        node.addEventListener(event, events[event]);
    };
    // const fragment = document.createDocumentFragment();
    // for (const child of children) {
    //     if (child === null || child === undefined) {
    //         continue;
    //     };
    //     const childNode = typeof child === 'object' ? toNode(child) : document.createTextNode(child);
    //     fragment.appendChild(childNode);
    // };
    
    node.appendChild(createChildren(children));
    if (rest.hasOwnProperty("onNodeReady")) {
        if (typeof rest["onNodeReady"] === "function") {
            rest["onNodeReady"](node);
        };
    };
    return node;
};


const createChildren = (children) => {
    const fragment = document.createDocumentFragment();
    for (const child of children) {
        if (child === null || child === undefined) {
            continue;
        };
        const childNode = typeof child === 'object' ? toNode(child) : document.createTextNode(child);
        fragment.appendChild(childNode);
    };
    return fragment;
};