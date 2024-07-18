import PortfolioItem from "../components/PortfolioItem.js";
import { toNode } from "./toNode.js";
import portfolio from "../data/portolio.js";
window.addEventListener('DOMContentLoaded', event => {

    const getPortfolioModal = () => {
        const modalMediaContainer = document.getElementById("modalMediaContainer");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalObject = new bootstrap.Modal(document.getElementById("portfolioModal"));
        const modalDemo = document.getElementById("modalDemo");

        const setMedia = (portfolioItem) => {
            modalMediaContainer.innerHTML = "";
            const media = toNode(portfolioItem.mediaNodes);
            modalMediaContainer.append(media);
        };
        const setTitle = (portfolioItem) => {
            modalTitle.innerHTML = portfolioItem.title;
        };

        const setDescription = (portfolioItem) => {
            modalDescription.innerHTML = portfolioItem.description;
            // modalDescription.style.height = 'auto';
            // modalDescription.style.height = (modalDescription.scrollHeight) + 'px';
            // console.log(modalDescription.scrollHeight);
        };
        const setDemoURL = (demo) => {
            return (demo === false) ? toNode("Not available.") : toNode({
                tag: "a",
                href: demo,
                children: [
                    demo
                ]
            });
        };

        const setDemo = (portfolioItem) => {
            modalDemo.innerHTML = "";
            modalDemo.appendChild(setDemoURL(portfolioItem.demo));
        };


        const setContents = (portfolioItem) => {
            if (portfolioItem instanceof PortfolioItem === false) {
                return;
            };
            setMedia(portfolioItem);
            setTitle(portfolioItem);
            setDescription(portfolioItem);
            setDemo(portfolioItem);
            modalObject.show();
        };
        return {
            setContents
        }
    };


    const portfolioItemsContainer = document.getElementById("portfolioItemsContainer");
    const modal = getPortfolioModal();

    for (const data of portfolio) {
        const p = new PortfolioItem({
            ...data,
            onClick: modal.setContents
        });

        portfolioItemsContainer.appendChild(p.node);
    };

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
