// ==UserScript==
// @name           Add Follow List Form
// @namespace      your-namespace
// @version        1.3
// @description    Adds a form with a labeled input box and submit button after the element with the ID "quot" and stores the input value in local storage when the submit button is clicked; loops through the elements with the class "author" and adds a border and "following" tag to the parent element with the class "post_list" if the username matches any username in the "followList" stored in local storage
// @match          https://www.253874.net/*
// @match          https://253874.net/*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=253874.net
// @grant          none
// ==/UserScript==

(function() {
      // Find the element with the ID "quot"
    const quot = document.getElementById("quot");

    // Create the form
    const form = createForm();

    // Add the form after the element with the ID "quot"
    quot.after(form);

    // Get the follow list from local storage
    const followList = localStorage.getItem("followList");

    // Create the input box
    const input = document.getElementById("follow-list-input");

    // Load the follow list in the input box after the page is loaded
    loadFollowList(input, followList);

    // Loop through the elements with the class "author"
    loopAuthors(authors => {
        // Highlight the posts by users in the follow list
        highlightPosts(authors, followList);
    });

    // Add an event listener to the form for when it is submitted
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the input value and format it
        const inputVal = input.value.trim().replace(/\s+/g, " ");

        // Store the input value in local storage
        localStorage.setItem("followList", inputVal);

        // Loop through the elements with the class "author" again to update the highlights
        loopAuthors(authors => {
            highlightPosts(authors, inputVal);
        });
    });


    function createForm() {
        // Create the form
        const form = document.createElement("form");
        form.id = "follow-list-form";

        // Create the label
        const label = document.createElement("label");
        label.htmlFor = "follow-list-input";
        label.textContent = "Following: ";
        form.appendChild(label);

        // Create the input box
        const input = document.createElement("input");
        input.type = "text";
        input.name = "follow-list";
        input.id = "follow-list-input";
        form.appendChild(input);

        // Create the submit button
        const submit = document.createElement("button");
        submit.type = "submit";
        submit.textContent = "Submit";
        form.appendChild(submit);

        return form;
    }

    function loadFollowList(input, followList) {
        // Load the follow list in the input box after the page is loaded
        input.value = followList;
    }

    function loopAuthors(callback) {
        // Loop through the elements with the class "author"
        const authors = document.querySelectorAll(".author");
        callback(authors);
    }






    function highlightPosts(authors, followList) {
    // Loop through the elements with the class "author" and highlight the posts by users in the follow list
    for (let i = 0; i < authors.length; i++) {
        const author = authors[i];

        // Get the username from the author element
        const usernameElement = author.querySelector(".username");
        if (!usernameElement) continue; // skip if username element is not found
        let username = usernameElement.textContent.trim();
        username = username.replace(/\【.*?\】/g, "").trim(); // remove text enclosed in square brackets

        // Check if the username is in the follow list
        if (followList && followList.includes(username)) {
            // Add a border and "following" tag to the parent element with the class "post_list"
            const postList = author.closest(".post_list");
            postList.style.border = "2px solid green";


        } else {
            // Remove the border and "following" tag from the parent element with the class "post_list"
            const postList = author.closest(".post_list");
            postList.style.border = "";


        }
    }
}











})();
