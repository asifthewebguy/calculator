const addFooter = () => {
    const body = document.querySelector("body");
    // // creating source Element
    const sourceAttr = document.createAttribute("class");
    sourceAttr.value = "source";
    const source = document.createElement("div");
    source.setAttributeNode(sourceAttr);
    const sourceLink = document.createElement("a");
    sourceLink.href = "https://github.com/asifthewebguy/calculator";
    sourceLink.target = "_blank";
    const sourceimg = document.createElement("img");
    sourceimg.src = "./assets/github.svg";
    sourceLink.appendChild(sourceimg);
    source.appendChild(sourceLink);
    body.appendChild(source);
    // creating footer
    const footer = document.createElement("footer");
    const innerhtml = '&copy;';
    const anchor = document.createElement("a");
    anchor.innerText = "Asif";
    anchor.href = "https://asifthewebguy.github.io/";
    anchor.target = "_blank";
    footer.innerHTML = innerhtml;
    footer.appendChild(anchor);
    body.appendChild(footer);
};
addFooter();