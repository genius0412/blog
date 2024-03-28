---
title: "How I made a NextJS Blog in 2 Days"
subtitle: "My first blog post!"
date: "2024-03-28"
---
Hi. I'm Dohun Kim. This is how I made my blog in 2 days. I had some experience using React, but I had little to no experience using Next JS, so it was a bit of a challenge. Also, this was my first fullstack application with a front-end website with a database in the backend.
##  Project Setup
I used **Next JS 14** with an app router instead of the pages router. I have heard from other places that the app router is worse than the pages router, due to its slow loading speed, even though it is newer. I used **tailwindcss** to style the page, as I had a ton of experience using it. It is really easy to setup and use, and it reduces a lot of time designing and styling websites.
## Goals
I wanted to make a blog that consisted of a view count, a like count, and a toggleable light/dark mode. 
## Process
I followed two youtube tutorials (that are listed below) to make the basic structure with loading markdown files and converting them into JSX and a view count that deduplicates according to the user's ip address. Then, I added my own design with a header. Because I wanted a toggleable light/dark mode, I borrowed the button design from [**framer-motion**](https://www.framer.com/motion/examples/#layout-animations)'s example page and added functionality.
## Struggles
When I was implementing likes in the project, I thought it would be similar to view count. However, I was overlooking one fact. Users are not able to unsee a post, but they are able to unlike it. So, I had to make it so that the likes are toggleable, and it is saved so that when they visit the blog in the future, it would display it accordingly.
## Bugs
Currently, there is a bug where the likes on 'post' view and the 'posts' view are not synced.
## Future Plans
I am still working on the homepage, the about page, and I am planning to add a projects page where I list all my projects and accomplishments.
For the blog page, I am planning to add comments, a search feature, and a tag feature where users are able to look up different posts by specific tags. Additionally, I will work on changing the markdown files to mdx files so that I will be able to use JSX tags on each post.
## References
- [NextJS 13 Tutorial: Create a Static Blog from Markdown Files](https://youtu.be/Hiabp1GY8fA)
- [Next.js 14 Blog w/ View Counter and Minute Read](https://youtu.be/MnDuL-Rml10)