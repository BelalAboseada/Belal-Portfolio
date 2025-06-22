import { Skill } from "./types";

// Import skill icons
import Html from "@/assets/html_ph9Z0PP.png";
import Js from "@/assets/Js.webp";
import Ts from "@/assets/ts.png";
import Mongo from "@/assets/Mdb.png";
import Css from "@/assets/css.webp";
import React from "@/assets/React.webp";
import Redux from "@/assets/Redux.png";
import Git from "@/assets/git_nnrA35B.png";
import GithubIcon from "@/assets/code_LmikzpY.png";
import Firease from "@/assets/Firbase.webp";
import Bootsrap from "@/assets/Bootstrap.png";
import sass from "@/assets/sass.svg";
import Google from "@/assets/search_v42JcMU.png";
import Api from "@/assets/api_jWHrF5L.png";
import Deploy from "@/assets/rocket.png";
import Vscode from "@/assets/visual-studio_PvbYL6E.png";
import Gpt from "@/assets/chatbot_hKae2Xk.png";
import Agile from "@/assets/Agile.png";
import tailwind from "@/assets/icons8-tailwind-css-48.png";
import deepseek from "@/assets/deepSeek.png";
import postman from "@/assets/postman.webp";

export const skillsData: Skill[] = [
  { id: 1, title: "Html", img: Html, Cat: "Skills" },
  // { id: 2, title: "Javascript", img: Js, Cat: "Skills" },
  { id: 3, title: "Css", img: Css, Cat: "Skills" },
  { id: 2, title: "Typescript", img: Ts, Cat: "Skills" },
  { id: 4, title: "React", img: React, Cat: "Skills" },
  { id: 5, title: "Redux", img: Redux, Cat: "Skills" },
  { id: 6, title: "Firease", img: Firease, Cat: "Tools" },
  { id: 7, title: "git", img: Git, Cat: "Tools" },
  { id: 8, title: "GitHub", img: GithubIcon, Cat: "Tools" },
  { id: 9, title: "G(Search)", img: Google, Cat: "Tools" },
  { id: 10, title: "sass", img: sass, Cat: "Skills" },
  { id: 11, title: "Bootstrap", img: Bootsrap, Cat: "Skills" },
  { id: 12, title: "Api", img: Api, Cat: "Skills" },
  { id: 13, title: "Deploy", img: Deploy, Cat: "Skills" },
  { id: 14, title: "VS Code", img: Vscode, Cat: "Tools" },
  { id: 15, title: "Ai", img: Gpt, Cat: "Tools" },
  { id: 16, title: "tailwind css", img: tailwind, Cat: "Skills" },
  { id: 17, title: "deep seek", img: deepseek, Cat: "Tools" },
  { id: 18, title: "Agile(Scrum)", img: Agile, Cat: "Tools" },
  { id: 18, title: "Mongo db", img: Mongo, Cat: "Tools" },
  { id: 18, title: "Postman", img: postman, Cat: "Tools" },
];
