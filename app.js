const express = require("express");
const app = express();
const axios = require("axios");

async function fetchDataFromTagCat(id) {
  try {
    const response = await axios({
      method: "get",
      url: `https://j2a0695c95.execute-api.ap-south-1.amazonaws.com/prod/web-menu/tag-cat?qr_uid=${id}`,
      headers: {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "X-Api-Key": "97RaSTSOzv4fWjHtXMSkP3DG2bWSqf8zkEyzFric",
      },
    });
    return response.data.body.body.allCats;
  } catch (error) {
    console.error("Error fetching data from TagCat: ", error);
    throw error;
  }
}
async function fetchDataFromMenuList(id) {
  try {
    const response = await axios({
      method: "get",
      url: `https://j2a0695c95.execute-api.ap-south-1.amazonaws.com/prod/web-menu/menu-list?qr_uid=${id}`,
      headers: {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "X-Api-Key": "97RaSTSOzv4fWjHtXMSkP3DG2bWSqf8zkEyzFric",
      },
    });
    return response.data.body.body.allCats;
  } catch (error) {
    console.error("Error fetching data from TagCat: ", error);
    throw error;
  }
}
async function fetchDataFromCombcat(id) {
  try {
    const response = await axios({
      method: "get",
      url: `https://j2a0695c95.execute-api.ap-south-1.amazonaws.com/prod/web-menu/combocat?qr_uid=${id}`,
      headers: {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "X-Api-Key": "97RaSTSOzv4fWjHtXMSkP3DG2bWSqf8zkEyzFric",
      },
    });
    return response.data.body.body.allCombos;
  } catch (error) {
    console.error("Error fetching data from TagCat: ", error);
    throw error;
  }
}
async function combineAPIResponses(id) {
  try {
    const tagCats = await fetchDataFromTagCat(id);
    const allCats = await fetchDataFromMenuList(id);
    const allCombos = await fetchDataFromCombcat(id);

    const combinedResponse = {
      status: 200,
      body: {
        allCats: allCats,
        allCombos: allCombos,
        tagCats: tagCats,
      },
    };

    return combinedResponse;
  } catch (error) {
    console.error("Error combining API responses: ", error);
    throw error;
  }
}

app.get("/combinedData", async (req, res) => {
  try {
    const id = req.query.qr_uid;
    const response = await combineAPIResponses(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
