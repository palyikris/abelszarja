import { axios } from "axios";
import { cheerio } from "cheerio";

export default function GradesPage(props) {
  console.log(props);
  return <div></div>;
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      "https://kisnaplo.karinthy.hu/app/interface.php?view=v_roomplan&day=2023-01-17&week=2023W03&KSNPLSID=q6rah6jta8g82jbocqc71se6el"
    );
    const $ = cheerio.load(data);

    return {
      props: {
        data: $(".drazse_container").text()
      }
    };
  } catch (error) {
    return {
      props: {
        data: [],
        error: error.message
      }
    };
  }
}
