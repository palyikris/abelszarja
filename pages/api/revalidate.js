import axios from "axios";
import cheerio from "cheerio";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req, res) {
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(
        "https://apps.karinthy.hu/helyettesites/"
      );
      const $ = cheerio.load(data);

      return res.status(500).json({
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text()
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
