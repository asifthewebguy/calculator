const addGithubLinks = () => {
    const body = document.querySelector("body");
    // // creating source Element
    const sourceAttr = document.createAttribute("class");
    sourceAttr.value = "source";
    const source = document.createElement("div");
    source.setAttributeNode(sourceAttr);
    const sourceLink = document.createElement("a");
    sourceLink.href = "https://github.com/asifthewebguy/calculator-op";
    sourceLink.target = "_blank";
    const sourceimg = document.createElement("img");
    let sourceImgsrc = "./assets/github.svg";
    sourceimg.src = sourceImgsrc;
    sourceLink.appendChild(sourceimg);
    source.appendChild(sourceLink);
    source.addEventListener("mouseover", () => { sourceimg.src = "https://avatars.githubusercontent.com/u/78401115?s=40&v=4"; });
    source.addEventListener("mouseout", () => { sourceimg.src = sourceImgsrc; });
    body.appendChild(source);

    // Hover effect for source link


    // creating footer
    const footer = document.createElement("footer");
    const innerhtml = '&copy; ';
    const anchor = document.createElement("a");
    anchor.innerText = "Asif";
    anchor.href = "https://asifthewebguy.me/";
    anchor.target = "_blank";
    footer.innerHTML = innerhtml;
    footer.appendChild(anchor);
    body.appendChild(footer);


};
addGithubLinks();