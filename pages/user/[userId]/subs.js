import axios from "axios";
import cheerio from "cheerio";

export default function SubsPage(props) {
  let { pageData } = props;
  pageData = pageData.replace(/\s+/g, " ");
  let lines = [];
  let line = [];
  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i - 1] === " " && pageData[i + 1] === " " && i != 0) {
      line.push(pageData[i]);
      lines.push(line);
      console.log(line.join(""));
      line = [];
    } else {
      line.push(pageData[i]);
    }
  }
  lines.splice(0, 1);
  lines.filter((line) => line.length > 0);

  return (
    <div>
      <ul>
        {lines.map((line, index) => {
          return <li key={index}>{line}</li>;
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
  const $ = cheerio.load(data);
  return {
    props: { pageData: $(".live.today tbody").text() }
  };
}
