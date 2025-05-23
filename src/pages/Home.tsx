import WordCloud from "react-d3-cloud";

const data = [
  { text: "TypeScript", value: 10000 },
  { text: "JavaScript", value: 5000 },
  { text: "ReactJS", value: 5000 },
  { text: "Web Components", value: 1000 },
  { text: "NodeJs", value: 1000 },
  { text: "Vite", value: 1500 },
  { text: "Playwright", value: 100 },
  { text: "Agile", value: 100 },
  { text: "GraphQL", value: 1800 },
  { text: "TailwindCSS", value: 1500 },
  { text: "PostgreSQL", value: 100 },
  { text: "MySQL", value: 100 },
  { text: "AWS", value: 1000 },
];

function Home() {
  return (
    <WordCloud
      data={data}
      height={500}
      font="Roboto"
      fontSize={(word) => Math.log2(word.value) * 5}
      spiral="rectangular"
      padding={5}
      random={Math.random}
    />
  );
}

export default Home;
