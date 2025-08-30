// data.ts
export const data = [
  {
    id: "1",
    title: "Schematics PDF's Files",
    category: "Drawings and Plans",
    subCategory: [
      { name: "General Services", content: "2d.png" },
      { name: "Lighting & Protective Services", content: "" },
      { name: "Distribution Schematics", content: "" },
    ],
    image: require("./assets/2d.png"), // ajuste o caminho: como o arquivo está na raiz, começa de ./assets
  },
  {
    id: "2",
    title: "Individual Circuit Apresentation",
    category: "3D Simulation",
    subCategory: [
      { name: "Lighting", content: "3D layout of lighting circuits" },
      { name: "Sockets", content: "3D layout of sockets" },
      { name: "Heating", content: "Heating overview" },
      { name: "Cooker", content: "Oven/Cooker electrical details" },
      { name: "TV", content: "TV points" },
      { name: "Internet", content: "Network layout" },
    ],
    image: require("./assets/pdf.png"),
  },
  {
    id: "3",
    title: "Financial Overview",
    category: "Certificates and Warrants",
    subCategory: [
      { name: "Datasheets", content: "Manufacturer technical documents" },
      { name: "Viability Certs", content: "Feasibility documentation" },
    ],
    image: require("./assets/certs.png"),
  },
];
